import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DiceRollRoutingModule } from './dice-roll-routing.module';
import { DiceRollPageComponent } from './components/features/dice-roll-page/dice-roll-page.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    DiceRollPageComponent
  ],
  imports: [
    CommonModule,
    DiceRollRoutingModule,
    SharedModule
  ]
})
export class DiceRollModule { }
