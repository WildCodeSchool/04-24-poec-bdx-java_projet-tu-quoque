import { inject, Injectable } from '@angular/core';
import { CharacterSheetService } from '../character-sheet.service';
import { map, Observable } from 'rxjs';

import { CharacterStats } from '../../../models/classes/character-stats.class';

@Injectable({
  providedIn: 'root'
})
export class ArmorClassService {
  sheetService: CharacterSheetService = inject(CharacterSheetService);

  getDexterityModifier$(): Observable<number> {
    return this.sheetService.getCaracteristics$().pipe(
      map((statList: CharacterStats) =>
        statList ? this.getDexterityModifier(statList) : 0
      ),
    )
  }

  getDexterityModifier(statList: CharacterStats): number {
    return statList.DEX.getFinalMod();
  }
}
