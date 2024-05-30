import { Injectable } from '@angular/core';
import { DbService } from '../../../shared/services/db-service/db.service';
import { distinctUntilChanged, map, Observable, Subject, switchMap } from 'rxjs';
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

  getLevel$(): Observable<number> {
    return this.listener.sendInfos().pipe(
      map((sheet: any) => sheet.level),
      distinctUntilChanged()
    );
  }

  getCaracteristics$(): Observable<StatisticDetails[]> {
    return this.listener.sendInfos().pipe(
      map((sheet: any) => sheet.stats)
    );
  }

  setSizeCategory$(): Observable<string> {
    return this.race$.pipe(
      map((race: Race) =>
        race ? race.sizeCategorie : ""
      ),
    );
  }

  setHeight$(): Observable<string> {
    let character: any;
    return this.listener.sendInfos().pipe(
      map((sheet: any) => {
        character = sheet;
        return sheet.gender;
      }),
      switchMap((gender: GenderEnum) => this.race$.pipe(
        map((race: Race) => {
          if (race && gender) {
            return this.setHeight(character, race, gender);
          }
          return "";
        }),
      ))
    );
  }

  setHeight(character: any, race: Race, gender: GenderEnum): string {
    if (!character.heightModifierRolled) {
      character.heightModifierRolled = DiceService.roll(race.modHeight).toString();
      this.pushOnStream('heightModifierRolled', character.heightModifierRolled.toString())
    }
    return this.calcHeight(race, gender, character.heightModifierRolled).toString();
  }

  calcHeight(race: Race, gender: GenderEnum, heightModifier: string): number {
    const baseHeight: number = race.baseHeight[gender];
    return baseHeight + Number(heightModifier);
  }

  setWeight$(): Observable<string> {
    let character: any;
    return this.listener.sendInfos().pipe(
      map((sheet: any) => {
        character = sheet;
        return sheet.gender;
      }),
      switchMap((gender: GenderEnum) => this.race$.pipe(
        map((race: Race) => {
          if (race && gender && character.heightModifierRolled) {
            return this.setWeight(character, race, gender);
          }
          return "";
        })
      ))
    );
  }

  setWeight(character: any, race: Race, gender: GenderEnum): string {
    if (!character.weightModifierRolled) {
      character.weightModifierRolled = DiceService.roll(race.modWeight).toString();
      this.pushOnStream("weightModifierRolled", character.weightModifierRolled)
    }
    return this.calcWeight(character, race, gender).toFixed(0);
  }

  calcWeight(character: any, race: Race, gender: GenderEnum): number {
    const baseWeight: number = race.baseWeight[gender];
    const heightModifier: number = Number(character.heightModifierRolled);
    const weightModifier: number = Number(character.weightModifierRolled);
    return (baseWeight + heightModifier * weightModifier / 5);
  }

  setAge$(): Observable<string> {
    let character: any;
    return this.listener.sendInfos().pipe(
      map((sheet: any) => {
        character = sheet;
        return sheet.characterClass;
      }),
      switchMap(() => this.race$.pipe(
        map((race: Race) => this.setAge(character, race))
      )
      )
    )
  }

  setAge(character: any, race: Race): string {
    if (character.age) {
      return character.age;
    } else if (character.characterClass && character.characterRace) {
      const age = this.calcAge(character, race).toString();
      this.pushOnStream("age", age);
      return age;
    }
    return "";
  }

  calcAge(character: any, race: Race): number {
    return race.adultAge + DiceService.roll(race.ageModifier[character.characterClass as ClassEnum])
  }

  pushOnStream(key: string, valueSent: string): void {
    this.infoAutoGenerated$.next(
      this.createBasicField(key, valueSent)
    );
  }

  createBasicField(key: string, valueSent: string): BasicField {
    return {
      index: key,
      value: valueSent
    };
  }
}
