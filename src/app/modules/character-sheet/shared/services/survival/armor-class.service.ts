import { inject, Injectable } from '@angular/core';
import { CharacterSheetService } from '../character-sheet.service';
import { map, Observable } from 'rxjs';
import { StatisticDetails } from '../../../models/classes/statistic-details.class';

@Injectable({
  providedIn: 'root'
})
export class ArmorClassService {
  sheetService: CharacterSheetService = inject(CharacterSheetService);

  getDexMod$(): Observable<number> {
    return this.sheetService.getCaracteristics$().pipe(
      map((statList: StatisticDetails[]) =>
        statList ? this.getDexMod(statList) : NaN
      ))
  }

  getDexMod(statList: StatisticDetails[]) {
    return (statList.find((stat: StatisticDetails) =>
      stat.abbr === "DEX") as StatisticDetails).getFinalMod()
  }
}
