import { Component, Input, OnInit } from '@angular/core';
import { StatisticDetails } from '../../../../models/classes/statistic-details.class';
import { ListenPlayerActionService } from '../../../../shared/services/listen-player-action.service';
import { Subject } from 'rxjs';
import { StatField } from '../../../../shared/models/types/stat-field.type';
import { AbstractListenerComponent } from '../../../../shared/abstract-components/asbtract-listener-component.component';

@Component({
  selector: '[trStatistic]',
  templateUrl: './statistic.component.html',
  styleUrl: './statistic.component.scss'
})
export class StatisticComponent extends AbstractListenerComponent implements OnInit {
  @Input()
  stat!: StatisticDetails;
  @Input()
  index!: number;

  @Input()
  playerInput: any;
  playerInput$: Subject<StatField> = new Subject();

  ngOnInit(): void {
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
