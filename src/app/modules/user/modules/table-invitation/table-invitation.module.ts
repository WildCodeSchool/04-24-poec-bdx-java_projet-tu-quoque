import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TableInvitationRoutingModule } from './table-invitation-routing.module';
import { TableInvitationComponent } from './components/features/table-invitation/table-invitation.component';
import { SharedModule } from '../../../shared/shared.module';
import { AvailableCharacterListComponent } from './components/features/available-character-list/available-character-list.component';


@NgModule({
  declarations: [
    TableInvitationComponent,
    AvailableCharacterListComponent
  ],
  imports: [
    CommonModule,
    TableInvitationRoutingModule,
    SharedModule
  ]
})
export class TableInvitationModule { }
