import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: "",
    redirectTo: "management",
    pathMatch: "full"
  },
  {
    path: "management",
    loadChildren: () => import("./modules/character-management/character-management.module")
    .then(m => m.CharacterManagementModule)
  },
  {
    path: "creation",
    loadChildren: () => import("./modules/character-creation/character-creation.module")
    .then(m => m.CharacterCreationModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CharacterRoutingModule { }
