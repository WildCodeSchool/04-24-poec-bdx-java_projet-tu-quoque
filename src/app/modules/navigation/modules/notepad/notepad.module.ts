import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotepadRoutingModule } from './notepad-routing.module';
import { NotepadMainPageComponent } from './pages/notepad-main-page/notepad-main-page.component';
import { SharedModule } from '../../../shared/shared.module';
import { GameNotesComponent } from './components/features/game-notes/game-notes.component';
import { UserNotesComponent } from './components/features/user-notes/user-notes.component';


@NgModule({
  declarations: [
    NotepadMainPageComponent,
    GameNotesComponent,
    UserNotesComponent
  ],
  imports: [
    CommonModule,
    NotepadRoutingModule,
    SharedModule
  ],
  exports: [
    NotepadMainPageComponent
  ]
})
export class NotepadModule { }
