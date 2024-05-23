import { Component, DestroyRef } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { EventService } from '../../../../../../../../../../shared/services/event/event.service';
import { ActivatedRoute } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-shared-table-calendar',
  templateUrl: './shared-table-calendar.component.html',
  styleUrl: './shared-table-calendar.component.scss',
})
export class SharedTableCalendarComponent {
  
  calendarOptions!: CalendarOptions;

  constructor(
    private _eventService: EventService,
    private _route: ActivatedRoute,
    private _destroyRef: DestroyRef
  ) {}

  ngOnInit() {
    const id = Number(this._route.snapshot.paramMap.get('id'));
    this._eventService
      .getEventListByTable$(id)
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe();
    this._eventService
      .getEnventList$()
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe((events: Event[]) => this.initializeCalendarOptions(events));
  }

  initializeCalendarOptions(events: Event[]): void {
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
          click: this._eventService.createNewEvent,
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
