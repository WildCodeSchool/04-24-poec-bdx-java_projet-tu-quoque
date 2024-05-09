import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameNoteManagementRoutingModule } from './game-note-management-routing.module';
import { GameNotesComponent } from './features/game-notes/game-notes.component';
import { SharedModule } from '../../../../../shared/shared.module';

@NgModule({
  declarations: [
       GameNotesComponent
  ],
  imports: [
    CommonModule,
    GameNoteManagementRoutingModule,
    SharedModule
  ]
})
export class GameNoteManagementModule { }
