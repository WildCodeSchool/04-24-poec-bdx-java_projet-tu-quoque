import { Component, DestroyRef, EventEmitter, inject, Output } from '@angular/core';
import { StatisticsService } from '../../../../shared/services/statistics.service';
import { CharacterStats } from '../../../../models/classes/character-stats.class';
import { CharacterSheetService } from '../../../../shared/services/character-sheet.service';
import { ListenPlayerActionService } from '../../../../shared/services/listen-player-action.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-statistics-dice',
  templateUrl: './statistics-dice.component.html',
  styleUrl: './statistics-dice.component.scss'
})
export class StatisticsDiceComponent {
  private statService: StatisticsService = inject(StatisticsService);
  private listener: ListenPlayerActionService = inject(ListenPlayerActionService);
  private destroyRef: DestroyRef = inject(DestroyRef);
  isVisible: boolean = true;

  @Output()
  emitter: EventEmitter<CharacterStats> = new EventEmitter();

  ngOnInit() {
    this.listener.sendInfos().pipe(
      takeUntilDestroyed(this.destroyRef),
    ).subscribe(data => {
      if (data.stats.FOR.originalValue) {
        this.isVisible = false;
      }
    });
  }
  generateStatistics(): void {
    this.isVisible = !this.isVisible;
    this.statService.generate();
    this.emitter.emit(this.statService.stats);
  }
}
