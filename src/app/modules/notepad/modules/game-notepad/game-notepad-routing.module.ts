import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddNotePageComponent } from '../../../shared/components/add-note-page/add-note-page.component';

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
    component: AddNotePageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GameNotepadRoutingModule { }
