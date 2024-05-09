import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotepadMainPageComponent } from './features/notepad-main-page/notepad-main-page.component';

const routes: Routes = [
  {
    path: "",
    component: NotepadMainPageComponent,
    children: [
      {
        path: "user/:id/notes",
        loadChildren: () => import('./modules/user-notepad/user-notepad.module')
        .then(m => m.UserNotepadModule)
      },
      {
        path: "game/:id/notes",
        loadChildren: () => import('./modules/game-notepad/game-notepad.module')
        .then(m => m.GameNotepadModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotepadRoutingModule { }
