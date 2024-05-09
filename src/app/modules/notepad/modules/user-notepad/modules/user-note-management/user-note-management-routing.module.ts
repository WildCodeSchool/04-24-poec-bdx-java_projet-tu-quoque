import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserNotesComponent } from './features/user-notes/user-notes.component';
import { UserNotePageComponent } from './features/user-note-page/user-note-page.component';

const routes: Routes = [
  {
    path: "",
    redirectTo: "myNotes",
    pathMatch: "full"
  },
  {
    path: "myNotes",
    component: UserNotesComponent
  },
  {
    path: "note/:id",
    component: UserNotePageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserNoteManagementRoutingModule { }
