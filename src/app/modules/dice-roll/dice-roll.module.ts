import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DiceRollRoutingModule } from './dice-roll-routing.module';
import { DiceRollPageComponent } from './components/features/dice-roll-page/dice-roll-page.component';
import { SharedModule } from '../shared/shared.module';
import { DiceRollScorePopupComponent } from './components/ui/dice-roll-score-popup/dice-roll-score-popup.component';
import { DiceRollRulesComponent } from './components/ui/dice-roll-rules/dice-roll-rules.component';


@NgModule({
  declarations: [
    DiceRollPageComponent,
    DiceRollScorePopupComponent,
    DiceRollRulesComponent
  ],
  imports: [
    CommonModule,
    DiceRollRoutingModule,
    SharedModule
  ]
})
export class DiceRollModule { }
