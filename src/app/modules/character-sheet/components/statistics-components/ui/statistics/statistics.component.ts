import { Component, Input } from '@angular/core';
import { StatisticDetails } from '../../../../models/classes/statistics-details.class';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrl: './statistics.component.scss'
})
export class StatisticsComponent {
  @Input()
  stats$!: Observable<StatisticDetails[]>;
}
