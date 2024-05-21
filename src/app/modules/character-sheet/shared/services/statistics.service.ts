import { Injectable } from '@angular/core';
import { StatisticDetails } from '../../models/classes/statistic-details.class';
import { StatAbbr, StatAbbrKey } from '../../models/enums/stats-abbr.enum';
import { StatModifier } from '../../models/types/stat-modifier.type';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {
  stats: StatisticDetails[] = [];

  generate(): StatisticDetails[] {
    while (!this.isViable()) {
      this.tryGenerateStatistics();
    }
    return this.stats;
  }

  tryGenerateStatistics(): void {
    this.stats = [];
    for (let key of Object.keys(StatAbbr)) {
      this.stats.push(new StatisticDetails(key as StatAbbrKey));
    }
  }

  isViable(): boolean {
    let sum = 0;
    let sup13 = 0;
    for (let stat of this.stats) {
      sum += stat.mod;
      if (stat.value > 13) sup13 += 1;
    }
    if (sum <= 0 || sup13 == 0) return false;
    return true;
  }

  applyRaceModifiers(modifiers: StatModifier[]): StatisticDetails[] {
    for (let stat of this.stats) {
      stat.applyModifiers(modifiers);
    }
    return this.stats;
  }
}
