import { inject, Injectable } from '@angular/core';
import { CharacterSheetService } from '../character-sheet.service';
import { CharacterClass } from '../../../models/types/character-class.type';
import { PossibleDice, PossibleDiceKey } from '../../../../shared/models/enums/possible-dice.enum';
import { map, Observable, switchMap, tap } from 'rxjs';
import { StatisticDetails } from '../../../models/classes/statistic-details.class';
import { HitPointCalculationService } from './hit-point-calculation.service';

@Injectable({
  providedIn: 'root'
})
export class HitPointService {
  sheetService: CharacterSheetService = inject(CharacterSheetService);

  diceType!: PossibleDice;

  constructor() { }

  getHitPoints$(): Observable<number> {
    return this.sheetService.getClasseDetails$().pipe(
      map((classDetails: CharacterClass) => {
        if (classDetails) return classDetails.DV;
        else {
          return undefined;
        }
      }
      ),
      switchMap((dice: PossibleDiceKey | undefined) => this.sheetService.getLevel$().pipe(
        switchMap((level: number) => this.sheetService.getCaracteristics$().pipe(
          map((statList: StatisticDetails[]) => statList.find((stat: StatisticDetails) =>
            stat.abbr === "CON") as StatisticDetails),
          map((stat: StatisticDetails) => {
            if (dice && level) {
              return HitPointCalculationService.setHitPoints(dice, level, stat)
            }
            else {
              return undefined;
            }
          }),
          map((nb: number | undefined) => {
            if (nb) return nb;
            else return NaN;
          }
          ),
        )
        ))
      ))
  }
}
