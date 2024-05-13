import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TableInvitationRoutingModule } from './table-invitation-routing.module';
import { TableInvitationComponent } from './components/features/table-invitation/table-invitation.component';
import { SharedModule } from '../../../shared/shared.module';


@NgModule({
  declarations: [
    TableInvitationComponent
  ],
  imports: [
    CommonModule,
    TableInvitationRoutingModule,
    SharedModule
  ]
})
export class TableInvitationModule { }
