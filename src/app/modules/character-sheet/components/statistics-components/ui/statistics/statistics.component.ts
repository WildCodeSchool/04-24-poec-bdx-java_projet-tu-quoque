import { Component, Input } from '@angular/core';
import { StatisticDetails } from '../../../../models/classes/statistics-details.class';


@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrl: './statistics.component.scss'
})
export class StatisticsComponent {
  @Input()
  stats: StatisticDetails[] = [];
}
