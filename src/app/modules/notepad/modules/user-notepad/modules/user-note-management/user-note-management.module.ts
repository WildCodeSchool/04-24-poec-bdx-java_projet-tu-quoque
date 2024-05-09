import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserNoteManagementRoutingModule } from './user-note-management-routing.module';
import { UserNotesComponent } from './features/user-notes/user-notes.component';
import { SharedModule } from '../../../../../shared/shared.module';


@NgModule({
  declarations: [
    UserNotesComponent,
  ],
  imports: [
    CommonModule,
    UserNoteManagementRoutingModule,
    SharedModule
  ]
})
export class UserNoteManagementModule { }
