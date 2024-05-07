import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TableManagementRoutingModule } from './table-management-routing.module';
import { UserTablesComponent } from './components/features/user-tables/user-tables.component';
import { SharedModule } from '../../../../../shared/shared.module';
import { TablePageComponent } from './components/features/table-page/table-page.component';
import { TablePresentationComponent } from './components/ui/table-presentation/table-presentation.component';


@NgModule({
  declarations: [
    UserTablesComponent,
    TablePageComponent,
    TablePresentationComponent
  ],
  imports: [
    CommonModule,
    TableManagementRoutingModule,
    SharedModule
  ]
})
export class TableManagementModule { }
