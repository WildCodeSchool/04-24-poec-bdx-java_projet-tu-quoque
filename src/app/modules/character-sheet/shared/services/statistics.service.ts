import { Injectable } from '@angular/core';
import { StatisticDetails } from '../../models/classes/statistic-details.class';
import { StatAbbr, StatAbbrKey } from '../../models/enums/stats-abbr.enum';
import { StatModifier } from '../../models/types/stat-modifier.type';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {
  stats: StatisticDetails[] = [];
  constructor() { }

  generate() {
    while (!this.isViable()) {
      this.tryGenerateStatistics();
    }
    return this.stats;
  }

  tryGenerateStatistics() {
    this.stats = [];
    for (let key of Object.keys(StatAbbr)) {
      this.stats.push(new StatisticDetails(key as StatAbbrKey));
    }
  }

  isViable() {
    let sum = 0;
    let sup13 = 0;
    for (let stat of this.stats) {
      sum += stat.mod;
      if (stat.value > 13) sup13 += 1;
    }
    if (sum <= 0 || sup13 == 0) return false;
    return true;
  }

  applyRaceModifiers(modifiers: StatModifier[]) {
    for (let stat of this.stats) {
      let changed = false;
      for (let modifier of modifiers) {
        if (modifier.stat == stat.abbr) {
          stat.value = stat.originalValue + modifier.mod;
          changed = true;
          stat.setMod();
        }
      }
      if (!changed) {
        stat.value = stat.originalValue;
        stat.setMod()
      }
    }
    return this.stats;
  }
}
