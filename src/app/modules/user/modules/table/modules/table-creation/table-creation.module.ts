import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TableCreationRoutingModule } from './table-creation-routing.module';
import { NewTableComponent } from './components/features/new-table/new-table.component';
import { SharedModule } from '../../../../../shared/shared.module';


@NgModule({
  declarations: [
    NewTableComponent
  ],
  imports: [
    CommonModule,
    TableCreationRoutingModule,
    SharedModule
  ]
})
export class TableCreationModule { }
