import { Component, inject } from '@angular/core';
import { StatisticsService } from '../../../../shared/services/statistics.service';

@Component({
  selector: 'app-statistics-dice',
  templateUrl: './statistics-dice.component.html',
  styleUrl: './statistics-dice.component.scss'
})
export class StatisticsDiceComponent {
  private statService: StatisticsService = inject(StatisticsService);

  generateStatistics() {
    this.statService.generate()
  }
}
