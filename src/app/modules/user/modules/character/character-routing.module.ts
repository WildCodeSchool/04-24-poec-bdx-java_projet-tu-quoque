import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CharacterManagementComponent } from './components/character-management/character-management.component';

const routes: Routes = [
  {
    path: "",
    redirectTo: "management",
    pathMatch: "full"
  },
  {
    path: "management",
    component: CharacterManagementComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CharacterRoutingModule { }
