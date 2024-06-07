import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddNotePageComponent } from '../../../shared/components/add-note-page/add-note-page.component';
import { userResolver } from '../../../shared/resolver/user.resolver';

const routes: Routes = [
  {
    path:"",
    redirectTo: "management",
    pathMatch: "full",
    resolve: {userResolver}
  },
  {
    path: "management",
    loadChildren: () => import('./modules/user-note-management/user-note-management.module')
    .then(m => m.UserNoteManagementModule)
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
export class UserNotepadRoutingModule { }
