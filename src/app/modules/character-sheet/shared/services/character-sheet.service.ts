import { Injectable } from '@angular/core';
import { DbService } from '../../../shared/services/db-service/db.service';
import { map, Observable, switchMap } from 'rxjs';
import { Race } from '../../models/types/race.type';
import { ListenPlayerActionService } from './listen-player-action.service';
import { CharacterClass } from '../../models/types/character-class.type';
import { Field } from '../models/types/field.type';
import { Gender } from '../../models/enums/gender.enum';
import { DiceService } from '../../../shared/services/dice-service/dice.service';

@Injectable({
  providedIn: 'root'
})
export class CharacterSheetService {

  race$: Observable<Race> = this.getRaceDetails$();
  characterClass$: Observable<CharacterClass> = this.getClasseDetails$();
  sizeCategory: Field = {
    name: 'sizeCategory',
    value: ''
  };
  height: Field = {
    name: 'height',
    value: ''
  };

  constructor(
    private listener: ListenPlayerActionService,
    private dbService: DbService,
  ) {
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
        race ? this.sizeCategory.value = race.sizeCategorie : this.sizeCategory.value = ""
      ),
    )
  }

  setHeight$() {
    let gender: Gender;
    let baseHeight;
    let heightModifier;
    let height: string;
    return this.listener.sendInfos().pipe(
      map((sheet: any) => {
        if (sheet.characterRace && sheet.gender) {
          gender = sheet.gender;
          height = sheet.height;
        }
        return gender;
      }),
      switchMap(((gender: Gender) => this.race$.pipe(
        map((race: Race) => {
          if (race && gender && !height) {
            baseHeight = race.baseHeight[gender];
            heightModifier = race.modHeight;
            return (baseHeight + DiceService.roll(heightModifier)).toString();
          }
          else if (race && gender && height) {
            return height;
          }
          else {
            return "";
          }
        }),
      ))
      )
    );
  }
}
