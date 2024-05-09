import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameNotesComponent } from './features/game-notes/game-notes.component';
import { GameNotePageComponent } from './features/game-note-page/game-note-page.component';

const routes: Routes = [
  {
    path: "",
    redirectTo: "myNotes",
    pathMatch: "full"
  },
  {
    path: "myNotes",
    component: GameNotesComponent
  },
  {
    path: "note/:id",
    component: GameNotePageComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GameNoteManagementRoutingModule { }
