import { Component, inject } from '@angular/core';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-dice-roll-score-popup',
  templateUrl: './dice-roll-score-popup.component.html',
  styleUrl: './dice-roll-score-popup.component.scss',
})
export class DiceRollScorePopupComponent {
  score!: any;
  config = inject(DynamicDialogConfig);

  ngOnInit(): void {
    this.score = this.config.data.info;
  }
}
