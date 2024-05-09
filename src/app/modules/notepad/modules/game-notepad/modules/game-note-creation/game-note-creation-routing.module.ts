import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NoteCreationPageComponent } from './features/note-creation-page/note-creation-page.component';

const routes: Routes = [
  {
    path: "",
    redirectTo: "newNote",
    pathMatch: "full"
  },
  {
    path: "",
    component: NoteCreationPageComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GameNoteCreationRoutingModule { }
