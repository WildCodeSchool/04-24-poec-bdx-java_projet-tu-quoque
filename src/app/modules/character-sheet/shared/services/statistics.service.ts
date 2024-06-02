import { Injectable } from '@angular/core';
import { StatisticDetails } from '../../models/classes/statistic-details.class';
import { StatAbbr, StatAbbrKey } from '../../models/enums/stats-abbr.enum';
import { StatModifier } from '../../models/types/stat-modifier.type';
import { CharacterStats } from '../../models/classes/character-stats.class';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {
  stats: CharacterStats = new CharacterStats();

  generate(): CharacterStats {
    while (!this.isViable()) {
      this.tryGenerateStatistics();
    }
    return this.stats;
  }

  tryGenerateStatistics(): void {
    for (let key of Object.keys(StatAbbr)) {
      this.stats[key as StatAbbrKey] = new StatisticDetails(key as StatAbbrKey);
    }
  }

  isViable(): boolean {
    const MINIMUM_STAT_VALUE_TO_BE_VIABLE = 13;
    let sum = 0;
    let supToMinimumStat = 0;
    for (let key of Object.keys(StatAbbr)) {
      sum += this.stats[key as StatAbbrKey].mod;
      if (this.stats[key as StatAbbrKey].value > MINIMUM_STAT_VALUE_TO_BE_VIABLE) supToMinimumStat += 1;
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
