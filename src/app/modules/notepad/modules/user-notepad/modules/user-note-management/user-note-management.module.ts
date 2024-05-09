import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserNoteManagementRoutingModule } from './user-note-management-routing.module';
import { UserNotesComponent } from './features/user-notes/user-notes.component';
import { UserNotePageComponent } from './features/user-note-page/user-note-page.component';
import { SharedModule } from '../../../../../shared/shared.module';


@NgModule({
  declarations: [
    UserNotesComponent,
    UserNotePageComponent
  ],
  imports: [
    CommonModule,
    UserNoteManagementRoutingModule,
    SharedModule
  ]
})
export class UserNoteManagementModule { }
