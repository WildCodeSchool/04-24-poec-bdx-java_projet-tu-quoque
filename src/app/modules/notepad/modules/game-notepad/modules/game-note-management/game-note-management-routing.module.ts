import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameNotesComponent } from './features/game-notes/game-notes.component';
import { ShowCommentPageComponent } from '../../../../../shared/components/show-comment-page/show-comment-page.component';

const routes: Routes = [
  {
    path: "",
    redirectTo: "game-notes",
    pathMatch: "full"
  },
  {
    path: "game-notes",
    component: GameNotesComponent
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
export class GameNoteManagementRoutingModule { }
