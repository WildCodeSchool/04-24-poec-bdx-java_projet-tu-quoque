import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { StatisticDetails } from '../../../../models/classes/statistic-details.class';

@Component({
  selector: 'app-init-ui-component',
  templateUrl: './init-ui-component.component.html',
  styleUrls: [
    './../generic-ui.style.scss',
    './init-ui-component.component.scss'
  ]
})
export class InitiativeUIComponent {
  @Input()
  dexterity$!: Observable<StatisticDetails>;
}
