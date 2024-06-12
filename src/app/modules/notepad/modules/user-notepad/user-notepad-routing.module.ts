import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddNotePageComponent } from '../../../shared/components/add-note-page/add-note-page.component';
import { userResolver } from '../../../shared/resolver/user.resolver';
import { authGuard } from '../../../shared/guards/auth.guard';

const routes: Routes = [
  {
    path:"",
    redirectTo: "management",
    pathMatch: "full",
    resolve: {user: userResolver},
  },
  {
    path: "management",
    loadChildren: () => import('./modules/user-note-management/user-note-management.module')
    .then(m => m.UserNoteManagementModule)
  },
  {
    path: "creation/:role",
    component: AddNotePageComponent,
    resolve: {user: userResolver},
    canActivate: [authGuard],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserNotepadRoutingModule { }
