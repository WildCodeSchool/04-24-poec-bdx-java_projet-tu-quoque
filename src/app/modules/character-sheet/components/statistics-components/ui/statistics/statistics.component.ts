import { Component, DestroyRef, OnInit } from '@angular/core';
import { StatAbbr, StatAbbrKey } from '../../../../models/enums/stats-abbr.enum';
import { StatisticDetails } from '../../../../models/classes/statistics-details.class';
import { ListenPlayerActionService } from '../../../../shared/services/listen-player-action.service';
import { map, Subject } from 'rxjs';
import { CharacterSheetService } from '../../../../shared/services/character-sheet.service';
import { StatModifier } from '../../../../models/types/stat-modifier.type';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrl: './statistics.component.scss'
})
export class StatisticsComponent implements OnInit {
  stats$: Subject<StatisticDetails[]> = new Subject();
  stats: StatisticDetails[] = [];

  constructor(
    private listener: ListenPlayerActionService,
    private sheetService: CharacterSheetService,
    private destroyRef: DestroyRef
  ) {

  }

  ngOnInit(): void {
    while (!this.isViable()) {
      this.stats = [];
      for (let key of Object.keys(StatAbbr)) {
        this.stats.push(new StatisticDetails(key as StatAbbrKey));
      }
    }
    this.listener.receiveStatsFrom(this.stats$.asObservable());
    this.sendStats();
    this.adjustStatsFunctionRace().pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe();
  }

  isViable() {
    let sum = 0;
    let sup13 = 0;
    for (let stat of this.stats) {
      sum += stat.mod;
      if (stat.value > 13) {
        sup13 += 1;
      }
    }
    if (sum <= 0 || sup13 == 0) {
      return false;
    }
    return true;
  }

  sendStats() {
    this.stats$.next(this.stats);
  }

  adjustStatsFunctionRace() {
    return this.sheetService.getRaceStatsModifiers$().pipe(
      map((modifiers: StatModifier[]) => {
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
      }),
    );
  }
}
