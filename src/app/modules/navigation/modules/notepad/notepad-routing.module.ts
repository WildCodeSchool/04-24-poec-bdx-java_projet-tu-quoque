import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserNotesComponent } from './components/features/user-notes/user-notes.component';
import { GameNotesComponent } from './components/features/game-notes/game-notes.component';

const routes: Routes = [
  {
    path: "",
    redirectTo: "userNotes/:id",
    pathMatch: "full"
  },
  {
    path: "userNotes/:id",
    component: UserNotesComponent
  },
  {
    path: "characterNotes/:id",
    component: GameNotesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotepadRoutingModule { }
