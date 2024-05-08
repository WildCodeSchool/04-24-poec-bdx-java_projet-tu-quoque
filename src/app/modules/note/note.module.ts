import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NoteRoutingModule } from './note-routing.module';
import { NoteMainPageComponent } from './page/note-main-page/note-main-page.component';
import { SharedModule } from '../shared/shared.module';
import { UserNotesComponent } from './components/features/user-notes/user-notes.component';
import { GameNotesComponent } from './components/features/game-notes/game-notes.component';


@NgModule({
  declarations: [
    NoteMainPageComponent,
    UserNotesComponent,
    GameNotesComponent
  ],
  imports: [
    CommonModule,
    NoteRoutingModule,
    SharedModule
  ],
  exports: [
    NoteMainPageComponent
  ]
})
export class NoteModule { }
