import { Component, Input, OnInit } from '@angular/core';
import { StatisticDetails } from '../../../../models/classes/statistic-details.class';
import { ListenPlayerActionService } from '../../../../shared/services/listen-player-action.service';
import { Subject } from 'rxjs';
import { StatField } from '../../../../shared/models/types/stat-field.type';
import { AbstractListenerComponent } from '../../../../shared/abstract-components/abstract-listener-component.component';
import { AbstractSendToListenerComponent } from '../../../../shared/abstract-components/abstract-send-to-listener-component.component';
import { Field } from '../../../../shared/models/types/field.type';

@Component({
  selector: '[trStatistic]',
  templateUrl: './statistic.component.html',
  styleUrl: './statistic.component.scss'
})
export class StatisticComponent extends AbstractSendToListenerComponent {
  @Input()
  stat!: StatisticDetails;
  @Input()
  index!: number;

  @Input()
  playerInput: any;
  // playerInput$: Subject<StatField> = new Subject();

  // ngOnInit(): void {
  //   this.listener.receiveStatField(this.playerInput$);
  // }
  override updateField(): Field {
    const statField: StatField = {
      index: this.index,
      value: this.stat
    }
    return statField;
  }

  updateTempValue() {
    this.stat.setStatTempValue(this.playerInput);
    this.sendChanges();
  }

  // sendChanges() {
  //   const statField: StatField = {
  //     index: this.index,
  //     value: this.stat
  //   }
  //   this.playerInput$.next(statField);
  // }
}
