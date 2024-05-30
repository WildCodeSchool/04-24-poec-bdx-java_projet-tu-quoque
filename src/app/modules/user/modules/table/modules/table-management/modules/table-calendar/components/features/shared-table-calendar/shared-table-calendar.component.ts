import { Component, DestroyRef, inject } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { EventService } from '../../../../../../../../../../shared/services/event/event.service';
import { ActivatedRoute } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { calendarEvent } from '../../../../../../../../../../shared/models/types/users/calendarEvent.type';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CalendarPopupComponent } from '../../calendar-popup/calendar-popup.component';

@Component({
  selector: 'app-shared-table-calendar',
  templateUrl: './shared-table-calendar.component.html',
  styleUrl: './shared-table-calendar.component.scss',
  providers: [DialogService]
})
export class SharedTableCalendarComponent {

  calendarOptions!: CalendarOptions;
  tableId!: number;
  ref: DynamicDialogRef | undefined;
  dialogService = inject(DialogService);
  constructor(
    private _eventService: EventService,
    private _route: ActivatedRoute,
    private _destroyRef: DestroyRef,
  ) {}

  closeCalendar(): void {}
  ngOnInit() {
    this.tableId = Number(this._route.snapshot.paramMap.get('id'));
    this._eventService
      .getEventListByTable$(this.tableId)
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe();
    this._eventService
      .getEnventList$()
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe((events: calendarEvent[]) =>
        this.initializeCalendarOptions(events)
      );
  }

  initializeCalendarOptions(events: any): void {
    this.calendarOptions = {
      plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
      initialView: 'dayGridMonth',
      locale: 'fr',
      contentHeight: '60vh',
      headerToolbar: {
        left: 'title',
        center: 'dayGridMonth,timeGridDay prev,next',
        right: '',
      },
      buttonText: {
        month: 'mois',
        day: 'jour',
      },
      dateClick: (info) => {
        this.createAvalability(info.date)
      },
      events: events,
      eventResizableFromStart: true,
      selectMirror: true,
      nowIndicator: true,
      navLinks: true,
      editable: true,
      firstDay: 1,
      eventDrop: this._eventService.moveEvent,
      eventResize: this._eventService.eventResize,
      // eventClick: this._eventService.showEventDetail,
      eventClick: (info) => {
        this.showEvent(info)
      },
      eventRemove: this._eventService.deleteEvent,
    };
  }
  createAvalability(info: any) {
    this.ref = this.dialogService.open(CalendarPopupComponent, {
        data: {
          tableId: this.tableId,
          startDate: info
        },
        header: 'Ajoutez votre disponibilité',
        width: '50vw',
        modal:true,
        breakpoints: {
            '960px': '75vw',
            '640px': '90vw'
        },
    })
    this.ref.onClose
    .pipe(takeUntilDestroyed(this._destroyRef))
    .subscribe((data:any) => {
      if(data) {
        this._eventService.addEvent(data)
      }
    })
  }

  showEvent(info: any) {
    console.log(info)
    this.ref = this.dialogService.open(CalendarPopupComponent, {
      data: {
        tableId: this.tableId,
        startDate: info
      },
      header: 'Ajoutez votre disponibilité',
      width: '50vw',
      modal:true,
      breakpoints: {
          '960px': '75vw',
          '640px': '90vw'
      },
    })
  }
}
