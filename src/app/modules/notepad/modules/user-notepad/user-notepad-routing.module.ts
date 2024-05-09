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
    loadChildren: () => import('./modules/user-note-management/user-note-management.module')
    .then(m => m.UserNoteManagementModule)
  },
  {
    path: "creation",
    loadChildren: () => import('./modules/user-note-creation/user-note-creation.module')
    .then(m => m.UserNoteCreationModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserNotepadRoutingModule { }
