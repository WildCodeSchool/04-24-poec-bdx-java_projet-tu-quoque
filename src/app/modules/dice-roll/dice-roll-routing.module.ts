import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DiceRollPageComponent } from './components/features/dice-roll-page/dice-roll-page.component';

const routes: Routes = [
  {
    path: '',
    component: DiceRollPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DiceRollRoutingModule { }
