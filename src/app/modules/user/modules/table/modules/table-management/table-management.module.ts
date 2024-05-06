import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TableManagementRoutingModule } from './table-management-routing.module';
import { UserTablesComponent } from './components/features/user-tables/user-tables.component';
import { SharedModule } from '../../../../../shared/shared.module';


@NgModule({
  declarations: [
    UserTablesComponent
  ],
  imports: [
    CommonModule,
    TableManagementRoutingModule,
    SharedModule
  ]
})
export class TableManagementModule { }
