import { Component, Input } from '@angular/core';
import { StatisticDetails } from '../../../../models/classes/statistic-details.class';
import { Observable } from 'rxjs';
import { CharacterStats } from '../../../../models/classes/character-stats.class';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrl: './statistics.component.scss'
})
export class StatisticsComponent {
  @Input()
  stats$!: Observable<CharacterStats>;
}
