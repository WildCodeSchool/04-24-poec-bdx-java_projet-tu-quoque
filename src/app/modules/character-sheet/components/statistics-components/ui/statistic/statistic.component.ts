import { Component, Input } from '@angular/core';
import { StatisticDetails } from '../../../../models/classes/statistic-details.class';
import { StatField } from '../../../../shared/models/types/stat-field.type';
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

  override ngOnInit(): void {
    this.updateTempValue();
  }

  override updateField(): Field {
    const statField: StatField = {
      index: this.index,
      value: this.stat
    }
    return statField;
  }

  updateTempValue(): void {
    this.stat.setStatTempValue(this.playerInput);
    this.sendChanges();
  }
}
