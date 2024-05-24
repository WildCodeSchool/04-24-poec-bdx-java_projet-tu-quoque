import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableCalendarRoutingModule } from './table-calendar-routing.module';
import { SharedTableCalendarComponent } from './components/features/shared-table-calendar/shared-table-calendar.component';
import { SharedModule } from '../../../../../../../shared/shared.module';

@NgModule({
  declarations: [
    SharedTableCalendarComponent
  ],
  imports: [
    CommonModule,
    TableCalendarRoutingModule,
    SharedModule
  ]
})
export class TableCalendarModule { }
