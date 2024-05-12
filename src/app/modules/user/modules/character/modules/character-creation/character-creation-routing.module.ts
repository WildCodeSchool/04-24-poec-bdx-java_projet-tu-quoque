import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewCharacterComponent } from './components/features/new-character/new-character.component';

const routes: Routes = [
  {
    path: "",
    redirectTo: "new-character",
    pathMatch: "full"
  },
  {
    path: "new-character",
    component: NewCharacterComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CharacterCreationRoutingModule { }
