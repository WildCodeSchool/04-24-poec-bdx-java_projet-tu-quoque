import { Component } from '@angular/core';
import { StatisticDetails } from '../../../../models/classes/statistics-details.class';
import { ListenPlayerActionService } from '../../../../shared/services/listen-player-action.service';
import { distinctUntilChanged, map, Observable } from 'rxjs';
import { CharacterSheetService } from '../../../../shared/services/character-sheet.service';
import { StatModifier } from '../../../../models/types/stat-modifier.type';
import { StatisticsService } from '../../../../shared/services/statistics.service';

@Component({
  selector: 'app-stat',
  templateUrl: './stat.component.html',
  styleUrl: './stat.component.scss'
})
export class StatComponent {
  stats$: Observable<StatisticDetails[]> = this.adjustStatsFunctionRace$();

  constructor(
    private listener: ListenPlayerActionService,
    private sheetService: CharacterSheetService,
    private statService: StatisticsService
  ) {
  }

  ngOnInit(): void {
    this.statService.generate();
    this.listener.receiveStatsFrom(this.stats$);
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
