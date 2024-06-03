import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { StatisticDetails } from '../../../models/classes/statistic-details.class';
import { CharacterSheetService } from '../character-sheet.service';
import { CharacterStats } from '../../../models/classes/character-stats.class';

@Injectable({
  providedIn: 'root'
})
export class InitiativeService {
  sheetService$: CharacterSheetService = inject(CharacterSheetService);
  dexterity$!: Observable<StatisticDetails>;

  constructor() {
    this.getDexterity();
  }

  getDexterity(): void {
    this.dexterity$ = this.sheetService$.getCaracteristics$().pipe(
      map((stats: CharacterStats) => stats ? stats.DEX : new StatisticDetails("DEX"))
    );
  }
}
