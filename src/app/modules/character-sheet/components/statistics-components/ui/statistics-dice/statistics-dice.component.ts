import { Component, EventEmitter, inject, Output } from '@angular/core';
import { StatisticsService } from '../../../../shared/services/statistics.service';
import { CharacterStats } from '../../../../models/classes/character-stats.class';

@Component({
  selector: 'app-statistics-dice',
  templateUrl: './statistics-dice.component.html',
  styleUrl: './statistics-dice.component.scss'
})
export class StatisticsDiceComponent {
  private statService: StatisticsService = inject(StatisticsService);
  isVisible: boolean = true;

  @Output()
  emitter: EventEmitter<CharacterStats> = new EventEmitter();

  generateStatistics(): void {

    this.isVisible = !this.isVisible;
    console.log(this.isVisible)
    this.statService.generate();
    this.emitter.emit(this.statService.stats);
  }
}
