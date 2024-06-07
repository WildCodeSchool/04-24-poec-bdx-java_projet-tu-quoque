import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserNotesComponent } from './features/user-notes/user-notes.component';
import { ShowCommentPageComponent } from '../../../../../shared/components/show-comment-page/show-comment-page.component';
import { userResolver } from '../../../../../shared/resolver/user.resolver';

const routes: Routes = [
  {
    path: "",
    redirectTo: "my-notes",
    pathMatch: "full",
    resolve: {userResolver}
  },
  {
    path: "my-notes",
    component: UserNotesComponent,
    resolve: {userResolver}
  },
  {
    path: "note/:id",
    component: ShowCommentPageComponent,
    resolve: {userResolver}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserNoteManagementRoutingModule { }
