import { DestroyRef, inject, Injectable } from '@angular/core';
import { StatisticDetails } from '../../models/classes/statistic-details.class';
import { StatModifier } from '../../models/types/stat-modifier.type';
import { CharacterStats } from '../../models/classes/character-stats.class';
import { map } from 'rxjs';
import { ListenPlayerActionService } from './listen-player-action.service';
import { Sheet } from '../../models/types/sheet.type';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {
  stats: CharacterStats = new CharacterStats();
  destroyRef: DestroyRef = inject(DestroyRef);
  listener = inject(ListenPlayerActionService);

  constructor() {
    this.listener.sendInfos().pipe(
      map((sheet: Sheet) => sheet.stats),
    ).subscribe(stats => {
      this.stats = stats;
    });
  }

  generate(): CharacterStats {
    while (!this.isViable()) {
      this.tryGenerateStatistics();
    }
    return this.stats;
  }

  tryGenerateStatistics(): void {
    for (let stat of this.stats) {
      this.stats[stat.abbr] = new StatisticDetails(stat.abbr, true);
    }
  }

  isViable(): boolean {
    const MINIMUM_STAT_VALUE_TO_BE_VIABLE = 13;
    let sum = 0;
    let supToMinimumStat = 0;
    for (let stat of this.stats) {
      sum += stat.mod;
      if (stat.originalValue > MINIMUM_STAT_VALUE_TO_BE_VIABLE) supToMinimumStat += 1;
    }
    if (sum <= 0 || supToMinimumStat == 0) return false;
    return true;
  }

  applyRaceModifiers(modifiers: StatModifier[]): CharacterStats {
    for (let modifier of modifiers) {
      this.stats[modifier.stat].applyModifier(modifier);
    }
    return this.stats;
  }
}
