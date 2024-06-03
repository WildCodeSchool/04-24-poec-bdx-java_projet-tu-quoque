import { inject, Injectable } from '@angular/core';
import { CharacterSheetService } from '../character-sheet.service';
import { CharacterClass } from '../../../models/types/character-class.type';
import { PossibleDiceKey } from '../../../../shared/models/enums/possible-dice.enum';
import { map, Observable, switchMap } from 'rxjs';
import { StatisticDetails } from '../../../models/classes/statistic-details.class';
import { HitPointCalculationService } from './hit-point-calculation.service';
import { CharacterStats } from '../../../models/classes/character-stats.class';

@Injectable({
  providedIn: 'root'
})
export class HitPointService {
  sheetService: CharacterSheetService = inject(CharacterSheetService);

  getHitPoints$(): Observable<number> {
    return this.sheetService.getClasseDetails$().pipe(
      map((classDetails: CharacterClass) => this.selectClasseDV(classDetails)
      ),
      switchMap((dice: PossibleDiceKey | undefined) => this.sheetService.getLevel$().pipe(
        switchMap((level: number) => this.sheetService.getCaracteristics$().pipe(
          map((statList: CharacterStats) => statList ? statList.CON : undefined),
          map((stat: StatisticDetails | undefined) => this.setHitPoints(dice, level, stat)),
        ))
      ))
    );
  }

  selectClasseDV(classDetails: CharacterClass): PossibleDiceKey | undefined {
    if (classDetails) return classDetails.hitPointDice;
    return undefined;
  }

  setHitPoints(dice: PossibleDiceKey | undefined, level: number, stat: StatisticDetails | undefined): number {
    if (dice && level && stat) {
      return HitPointCalculationService.setHitPoints(dice, level, stat)
    }
    else {
      return NaN;
    }
  }
}
