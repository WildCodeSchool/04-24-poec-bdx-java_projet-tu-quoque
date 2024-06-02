import { inject, Injectable } from '@angular/core';
import { CharacterSheetService } from '../character-sheet.service';
import { defaultIfEmpty, EMPTY, map, Observable } from 'rxjs';
import { StatisticDetails } from '../../../models/classes/statistic-details.class';
import { CharacterStats } from '../../../models/classes/character-stats.class';

@Injectable({
  providedIn: 'root'
})
export class ArmorClassService {
  sheetService: CharacterSheetService = inject(CharacterSheetService);

  getDexMod$(): Observable<number> {
    return this.sheetService.getCaracteristics$().pipe(
      map((statList: CharacterStats) =>
        statList ? this.getDexMod(statList) : 0
      ),
    )
  }

  getDexMod(statList: CharacterStats): number {
    return statList.DEX.getFinalMod();
  }
}
