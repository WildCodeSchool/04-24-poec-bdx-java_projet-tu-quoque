import { Component, inject } from '@angular/core';
import { calendarEvent } from '../../../../../../../../../shared/models/types/users/calendarEvent.type';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-calendar-popup',
  templateUrl: './calendar-popup.component.html',
  styleUrl: './calendar-popup.component.scss'
})
export class CalendarPopupComponent {

  config = inject(DynamicDialogConfig);
  ref = inject(DynamicDialogRef);
  tableId!: any;
  startDate!: any;
  title: string=""
  date: string="";
  description: string="";

  ngOnInit() {
    this.tableId = this.config.data.tableId;
    this.startDate = this.config.data.startDate;
  }

  onSubmit() {
    const newEvent: calendarEvent = {
      tableId: this.tableId,
      title: this.title,
      start: this.startDate,
      end: new Date(this.date),
      description: this.description,
      allDay: true
    }
    this.ref.close(newEvent);
  }
}
