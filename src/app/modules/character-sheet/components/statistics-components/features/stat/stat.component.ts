import { Component } from '@angular/core';
import { StatisticDetails } from '../../../../models/classes/statistic-details.class';
import { ListenPlayerActionService } from '../../../../shared/services/listen-player-action.service';
import { distinctUntilChanged, map, Observable } from 'rxjs';
import { CharacterSheetService } from '../../../../shared/services/character-sheet.service';
import { StatModifier } from '../../../../models/types/stat-modifier.type';
import { StatisticsService } from '../../../../shared/services/statistics.service';
import { StatListField } from '../../../../shared/models/types/stat-list-field.type';

@Component({
  selector: 'app-stat',
  templateUrl: './stat.component.html',
  styleUrl: './stat.component.scss'
})
export class StatComponent {
  stats$: Observable<StatisticDetails[]> = this.adjustStatsFunctionRace$();;
  statsField$!: Observable<StatListField>;

  constructor(
    private listener: ListenPlayerActionService,
    private sheetService: CharacterSheetService,
    private statService: StatisticsService
  ) {
  }

  ngOnInit(): void {
    this.statService.generate();
    this.statsField$ = this.transformStatListStreamIntoStatFieldStream();
    this.listener.receiveFieldFrom(this.statsField$);
  }

  adjustStatsFunctionRace$(): Observable<StatisticDetails[]> {
    return this.sheetService.getRaceStatsModifiers$().pipe(
      map((modifiers: StatModifier[]) =>
        this.statService.applyRaceModifiers(modifiers)
      ),
    )
  }

  transformStatListStreamIntoStatFieldStream(): Observable<StatListField> {
    return this.stats$.pipe(
      map((statList: StatisticDetails[]) =>
        this.transformStatisticDetailsListIntoStatListField(statList),
      ),
    );
  }

  transformStatisticDetailsListIntoStatListField(statList: StatisticDetails[]): StatListField {
    return { index: "statList", value: statList };
  }
}
