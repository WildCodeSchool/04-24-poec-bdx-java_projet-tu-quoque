import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { StatisticDetails } from '../../../../models/classes/statistic-details.class';
import { InitiativeService } from '../../../../shared/services/survival/initiative.service';

@Component({
  selector: 'app-init-component',
  templateUrl: './init-component.component.html',
  styleUrl: './init-component.component.scss'
})
export class InitiativeComponent {
  dexterity$: Observable<StatisticDetails> = inject(InitiativeService).dexterity$;
}
