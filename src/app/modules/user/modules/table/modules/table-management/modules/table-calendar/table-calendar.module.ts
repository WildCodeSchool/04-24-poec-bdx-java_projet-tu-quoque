import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableCalendarRoutingModule } from './table-calendar-routing.module';
import { SharedTableCalendarComponent } from './components/features/shared-table-calendar/shared-table-calendar.component';
import { SharedModule } from '../../../../../../../shared/shared.module';
import { EventPopupComponent } from './components/event-popup/event-popup.component';
import { CalendarPopupComponent } from './components/calendar-popup/calendar-popup.component';
import { InfoPopupComponent } from './components/info-popup/info-popup.component';

@NgModule({
  declarations: [
    SharedTableCalendarComponent,
    CalendarPopupComponent,
    InfoPopupComponent
  ],
  imports: [
    CommonModule,
    TableCalendarRoutingModule,
    SharedModule,
    EventPopupComponent
  ]
})
export class TableCalendarModule { }
