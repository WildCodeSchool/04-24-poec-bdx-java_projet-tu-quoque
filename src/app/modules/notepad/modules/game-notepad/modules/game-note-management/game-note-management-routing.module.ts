import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameNotesComponent } from './features/game-notes/game-notes.component';
import { ShowCommentPageComponent } from '../../../../../shared/components/show-comment-page/show-comment-page.component';
import { userResolver } from '../../../../../shared/resolver/user.resolver';

const routes: Routes = [
  {
    path: "",
    redirectTo: "game-notes",
    pathMatch: "full",
    resolve: {userResolver}
  },
  {
    path: "game-notes",
    component: GameNotesComponent,
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
export class GameNoteManagementRoutingModule { }
