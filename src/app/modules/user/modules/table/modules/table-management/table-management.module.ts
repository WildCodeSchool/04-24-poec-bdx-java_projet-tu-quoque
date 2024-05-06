import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TableManagementRoutingModule } from './table-management-routing.module';
import { UserTablesComponent } from './components/features/user-tables/user-tables.component';


@NgModule({
  declarations: [
    UserTablesComponent
  ],
  imports: [
    CommonModule,
    TableManagementRoutingModule
  ]
})
export class TableManagementModule { }
