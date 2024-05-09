import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GameNoteCreationRoutingModule } from './game-note-creation-routing.module';
import { NoteCreationPageComponent } from './features/note-creation-page/note-creation-page.component';


@NgModule({
  declarations: [
    NoteCreationPageComponent
  ],
  imports: [
    CommonModule,
    GameNoteCreationRoutingModule
  ]
})
export class GameNoteCreationModule { }
