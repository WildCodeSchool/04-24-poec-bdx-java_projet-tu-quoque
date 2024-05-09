import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:"",
    redirectTo: "management",
    pathMatch: "full"
  },
  {
    path: "management",
    loadChildren: () => import('./modules/game-note-management/game-note-management.module')
    .then(m => m.GameNoteManagementModule)
  },
  {
    path: "creation",
    loadChildren: () => import('./modules/game-note-creation/game-note-creation.module')
    .then(m => m.GameNoteCreationModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GameNotepadRoutingModule { }
