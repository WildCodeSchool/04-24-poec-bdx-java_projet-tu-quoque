import { Component, DestroyRef, OnInit } from '@angular/core';
import { StatAbbr, StatAbbrKey } from '../../../../models/enums/stats-abbr.enum';
import { StatisticDetails } from '../../../../models/classes/statistics-details.class';
import { ListenPlayerActionService } from '../../../../shared/services/listen-player-action.service';
import { distinctUntilChanged, map, Observable, Subject } from 'rxjs';
import { CharacterSheetService } from '../../../../shared/services/character-sheet.service';
import { StatModifier } from '../../../../models/types/stat-modifier.type';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { StatisticsService } from '../../../../shared/services/statistics.service';

@Component({
  selector: 'app-stat',
  templateUrl: './stat.component.html',
  styleUrl: './stat.component.scss'
})
export class StatComponent {
  stats$: Observable<StatisticDetails[]> = this.adjustStatsFunctionRace$();
  stats: StatisticDetails[] = [];

  constructor(
    private listener: ListenPlayerActionService,
    private sheetService: CharacterSheetService,
    private destroyRef: DestroyRef,
    private statService: StatisticsService
  ) {

  }

  ngOnInit(): void {
    this.stats = this.statService.generate();
    this.listener.receiveStatsFrom(
      this.adjustStatsFunctionRace$().pipe(
        takeUntilDestroyed(this.destroyRef)
      ));
  }

  adjustStatsFunctionRace$(): Observable<StatisticDetails[]> {
    return this.sheetService.getRaceStatsModifiers$().pipe(
      map((modifiers: StatModifier[]) =>
        this.statService.applyRaceModifiers(modifiers)
      ),
      distinctUntilChanged()
    );
  }
}
