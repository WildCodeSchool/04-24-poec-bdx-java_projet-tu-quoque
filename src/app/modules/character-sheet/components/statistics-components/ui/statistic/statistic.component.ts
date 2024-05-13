import { Component, Input } from '@angular/core';
import { StatisticDetails } from '../../../../models/classes/statistics-details.class';
import { ListenPlayerActionService } from '../../../../shared/services/listen-player-action.service';
import { Subject } from 'rxjs';
import { StatField } from '../../../../shared/models/types/stat-field.type';

@Component({
  selector: '[trStatistic]',
  templateUrl: './statistic.component.html',
  styleUrl: './statistic.component.scss'
})
export class StatisticComponent {
  @Input()
  stat!: StatisticDetails;
  @Input()
  index!: number;

  @Input()
  playerInput: any;
  playerInput$: Subject<StatField> = new Subject();

  constructor(private listener: ListenPlayerActionService) {
    this.listener.receiveStatFrom(this.playerInput$);
  }

  updateTempValue() {
    this.stat.setStatTempValue(this.playerInput);
    const statField: StatField = {
      index: this.index,
      stat: this.stat
    }
    this.playerInput$.next(statField);
  }
}
