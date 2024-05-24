import { Component, DestroyRef } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { EventService } from '../../../../../../../../../../shared/services/event/event.service';
import { ActivatedRoute } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { calendarEvent } from '../../../../../../../../../../shared/models/types/users/calendarEvent.type';

@Component({
  selector: 'app-shared-table-calendar',
  templateUrl: './shared-table-calendar.component.html',
  styleUrl: './shared-table-calendar.component.scss',
})
export class SharedTableCalendarComponent {
  
  calendarOptions!: CalendarOptions;
  tableId!: number;

  constructor(
    private _eventService: EventService,
    private _route: ActivatedRoute,
    private _destroyRef: DestroyRef
  ) {}

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
      contentHeight: '52vh',

      headerToolbar: {
        left: 'title',
        center: 'dayGridMonth,timeGridDay prev,next',
        right: 'addEventButton',
      },
      buttonText: {
        month: 'mois',
        day: 'jour',
      },
      customButtons: {
        addEventButton: {
          text: 'Ajouter',
          click:  this._eventService.createNewEvent
        },
      },
      events: events,
      eventResizableFromStart: true,
      nowIndicator: true,
      navLinks: true,
      editable: true,
      firstDay: 1,
      eventDrop: this._eventService.moveEvent,
      eventResize: this._eventService.eventResize,
      eventClick: this._eventService.showEventDetail,
    };
  }
}
