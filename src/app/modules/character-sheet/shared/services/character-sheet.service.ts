import { Injectable } from '@angular/core';
import { DbService } from '../../../shared/services/db-service/db.service';
import { map, Observable, Subject, switchMap } from 'rxjs';
import { Race } from '../../models/types/race.type';
import { ListenPlayerActionService } from './listen-player-action.service';
import { CharacterClass } from '../../models/types/character-class.type';
import { Field } from '../models/types/field.type';
import { GenderEnum } from '../../models/enums/gender.enum';
import { DiceService } from '../../../shared/services/dice-service/dice.service';
import { ClassEnum } from '../../models/enums/classes.enum';

@Injectable({
  providedIn: 'root'
})
export class CharacterSheetService {
  infoAutoGenerated$: Subject<Field> = new Subject();
  race$: Observable<Race> = this.getRaceDetails$();
  characterClass$: Observable<CharacterClass> = this.getClasseDetails$();

  constructor(
    private listener: ListenPlayerActionService,
    private dbService: DbService,
  ) {
    this.listener.receiveInfoFrom(this.infoAutoGenerated$);
  }

  getRaceDetails$(): Observable<Race> {
    return this.listener.sendInfos().pipe(
      map((sheet: any) => sheet.characterRace),
      switchMap((characterRace: string) => this.dbService.getRaces$().pipe(
        map((raceList: Race[]) => raceList.find((race: Race) => race.name == characterRace) as Race,
        ))
      ));
  }

  getClasseDetails$(): Observable<CharacterClass> {
    return this.listener.sendInfos().pipe(
      map((sheet: any) => sheet.characterClass),
      switchMap((characterClass: string) => this.dbService.getClasses$().pipe(
        map((classList: CharacterClass[]) => classList.find((classe: CharacterClass) => classe.name == characterClass) as CharacterClass,
        ))
      ));
  }

  setSizeCategory$() {
    return this.race$.pipe(
      map((race: Race) =>
        race ? race.sizeCategorie : ""
      ),
    )
  }

  setHeight$(): Observable<string> {
    let tmpSheet: any;
    let heightModifierRolled: number;
    return this.listener.sendInfos().pipe(
      map((sheet: any) => {
        tmpSheet = sheet;
        return sheet.gender;
      }),
      switchMap((gender: GenderEnum) => this.race$.pipe(
        map((race: Race) => {
          if (tmpSheet.height) {
            return tmpSheet.height;
          }
          else if (race && gender) {
            if (!tmpSheet.heightModifierRolled) {
              heightModifierRolled = DiceService.roll(race.modHeight);
              this.infoAutoGenerated$.next({
                name: 'heightModifierRolled',
                value: heightModifierRolled.toString()
              });
            }
            return (race.baseHeight[gender] + heightModifierRolled).toString();
          }
          else {
            return "";
          }
        }),
      ))
    );
  }

  setWeight$() {
    let tmpSheet: any;
    return this.listener.sendInfos().pipe(
      map((sheet: any) => {
        tmpSheet = sheet;
        return sheet.gender;
      }),
      switchMap((gender: GenderEnum) => this.race$.pipe(
        map((race: Race) => {
          if (tmpSheet.weight) {
            return tmpSheet.weight;
          }
          else if (race && gender && tmpSheet.heightModifierRolled) {
            return (race.baseWeight[gender] + (Number(tmpSheet.heightModifierRolled)) * DiceService.roll(race.modWeight) / 5).toFixed(0);
          }
          else {
            return "";
          }
        })
      ))
    );
  }
}
