import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserNotesComponent } from './features/user-notes/user-notes.component';
import { ShowCommentPageComponent } from '../../../../../shared/components/show-comment-page/show-comment-page.component';

const routes: Routes = [
  {
    path: "",
    redirectTo: "my-notes",
    pathMatch: "full"
  },
  {
    path: "my-notes",
    component: UserNotesComponent
  },
  {
    path: "note/:id",
    component: ShowCommentPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserNoteManagementRoutingModule { }
