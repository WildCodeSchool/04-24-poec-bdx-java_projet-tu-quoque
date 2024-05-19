import { Injectable } from '@angular/core';
import { DbService } from '../../../shared/services/db-service/db.service';
import { map, Observable, Subject, switchMap } from 'rxjs';
import { Race } from '../../models/types/race.type';
import { ListenPlayerActionService } from './listen-player-action.service';
import { CharacterClass } from '../../models/types/character-class.type';
import { BasicField } from '../models/types/basic-field.type';
import { GenderEnum } from '../../models/enums/gender.enum';
import { DiceService } from '../../../shared/services/dice-service/dice.service';
import { ClassEnum } from '../../models/enums/classes.enum';
import { StatModifier } from '../../models/types/stat-modifier.type';
import { StatisticDetails } from '../../models/classes/statistic-details.class';

@Injectable({
  providedIn: 'root'
})
export class CharacterSheetService {
  infoAutoGenerated$: Subject<BasicField> = new Subject();
  race$: Observable<Race> = this.getRaceDetails$();
  characterClass$: Observable<CharacterClass> = this.getClasseDetails$();

  constructor(
    private listener: ListenPlayerActionService,
    private dbService: DbService,
  ) {
    this.listener.receiveFieldFrom(this.infoAutoGenerated$.asObservable());
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
          if (race && gender) {
            if (!tmpSheet.heightModifierRolled) {
              heightModifierRolled = DiceService.roll(race.modHeight);
              this.pushOnStream('heightModifierRolled', heightModifierRolled.toString())
            }
            return (race.baseHeight[gender] + heightModifierRolled).toString();
          }
          return "";
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
          if (race && gender && tmpSheet.heightModifierRolled) {
            if (!tmpSheet.weightModifierRolled) {
              tmpSheet.weightModifierRolled = DiceService.roll(race.modWeight).toString();
              this.pushOnStream("weightModifierRolled", tmpSheet.weightModifierRolled)
            }
            return (race.baseWeight[gender] + (Number(tmpSheet.heightModifierRolled)) * Number(tmpSheet.weightModifierRolled) / 5).toFixed(0);
          }
          return "";
        })
      ))
    );
  }

  setAge$() {
    let tmpSheet: any;
    return this.listener.sendInfos().pipe(
      map((sheet: any) => {
        tmpSheet = sheet;
        return sheet.characterClass;
      }),
      switchMap(() => this.race$.pipe(
        map((race: Race) => {
          if (tmpSheet.age) {
            return tmpSheet.age;
          } else if (tmpSheet.characterClass && tmpSheet.characterRace) {
            const age = (race.adultAge + DiceService.roll(race.ageModifier[tmpSheet.characterClass as ClassEnum])).toString();
            this.pushOnStream("age", age);
            return age;
          }
          return "";
        })
      )
      )
    )
  }

  getRaceStatsModifiers$(): Observable<StatModifier[]> {
    return this.race$.pipe(
      map((race: Race) => {
        if (race) {
          return race.statsModifiers
        }
        return [];
      })
    );
  }

  getCaracteristics$(): Observable<StatisticDetails[]> {
    return this.listener.sendInfos().pipe(
      map((sheet: any) => sheet.stats)
    )
  }

  pushOnStream(key: string, valueSent: string) {
    this.infoAutoGenerated$.next(
      this.createField(key, valueSent)
    );
  }

  createField(key: string, valueSent: string) {
    return {
      index: key,
      value: valueSent
    };
  }
}
