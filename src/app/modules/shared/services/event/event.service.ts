import { Injectable } from '@angular/core';
import { ApiRessourceService } from '../api-ressource/api-ressource.service';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { EventClickArg, EventDropArg } from '@fullcalendar/core';
import { EventResizeDoneArg } from '@fullcalendar/interaction';
import { calendarEvent } from '../../models/types/users/calendarEvent.type';

@Injectable({
  providedIn: 'root',
})
export class EventService extends ApiRessourceService<any> {
  
  private eventList$ = new BehaviorSubject<any[]>([]);
  private readonly _BASE_URL: string = 'http://localhost:3000/events';

  constructor(protected override _http: HttpClient) {
    super(_http);
  }

  override getRessourceUrl(): string {
    return this._BASE_URL;
  }

  getEventListByTable$(tableId: number): Observable<calendarEvent[]> {
    return this.getAll$().pipe(
      map((events: calendarEvent[]) =>
        events.filter((event: calendarEvent) => event.tableId == tableId)
      ),
      tap((eventListFiltered: calendarEvent[]) =>
        this.eventList$.next(eventListFiltered)
      )
    );
  }

  getEnventList$(): Observable<calendarEvent[]> {
    return this.eventList$.asObservable();
  }

  addEvent(event: calendarEvent) {
    const currentEventList: calendarEvent[] = this.eventList$.value;
    this.eventList$.next([...currentEventList, event]);
  }

  createNewEvent = (element: any): void => {
    const dateStr = prompt('Ajoutez une date au format YYYY-MM-DD');
    const title = prompt('Ajoutez votre titre');
    const date: Date = new Date(dateStr + 'T00:00:00');
    if (!isNaN(date.valueOf())) {
      const newEvent: calendarEvent = {
        tableId: element.tableId,
        title: title ? title : 'non défini',
        start: date,
        allDay: true,
      };
      this.addEvent(newEvent);
    }
  };

  showDetail(arg: EventClickArg) {
    alert(arg.event.title);
  }

  showEventDetail = (arg: EventClickArg): void => this.showDetail(arg);

  eventResize = (info: EventResizeDoneArg): void => {
    console.log(info.event.start);
    console.log(info.event.end);
  };

  moveEvent = (info: EventDropArg): void => {
    if (!confirm('Etes-vous sûr ?')) {
      info.revert();
    }
  };
}
