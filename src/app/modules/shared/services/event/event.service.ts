import { Injectable, inject } from '@angular/core';
import { ApiRessourceService } from '../api-ressource/api-ressource.service';
import { BehaviorSubject, Observable, map, switchMap, tap } from 'rxjs';
import { EventDropArg, EventRemoveArg } from '@fullcalendar/core';
import { EventResizeDoneArg } from '@fullcalendar/interaction';
import { calendarEvent } from '../../models/types/users/calendarEvent.type';
import { environment } from '../../../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class EventService extends ApiRessourceService<any> {
  
  private eventList$ = new BehaviorSubject<calendarEvent[]>([]);
  private readonly _BASE_URL: string = environment.baseUrl + '/events';

  override getRessourceUrl(): string {
    return this._BASE_URL;
  }

  getEventListByTableNew$(tableId: number): Observable<calendarEvent[]> {
    const currentEventList: calendarEvent[] = this.eventList$.value;
    const headers = this.getHeaders();
    return this._http
      .get<calendarEvent[]>(this._BASE_URL + `/get/tableId=${tableId}`, {
        headers,
      })
      .pipe(
        tap((eventList: any[]) =>
          this.eventList$.next([...currentEventList, ...eventList])
        ),
        switchMap(() => this.getEnventList$())
      );
  }

  getEnventList$(): Observable<calendarEvent[]> {
    return this.eventList$.asObservable();
  }

  addEventNew(tableEvent: calendarEvent, tableId: number): Observable<any> {
    const currentEventList: calendarEvent[] = this.eventList$.value;
    this.eventList$.next([...currentEventList, tableEvent]);
    return this._http.post(this._BASE_URL + `/add/${tableId}`, tableEvent);
  }

  eventResize = (info: EventResizeDoneArg): void => {
    const modifiedEvent: calendarEvent = {
      id: Number(info.oldEvent._def.publicId),
      tableId: info.oldEvent.extendedProps['tableId'],
      title: info.oldEvent._def.title,
      start: info.event.start,
      end: info.event.end,
      allDay: true,
    };
  };

  moveEvent = (info: EventDropArg): void => {
    const movedEvent: calendarEvent = {
      id: Number(info.oldEvent._def.publicId),
      tableId: info.oldEvent.extendedProps['tableId'],
      title: info.oldEvent._def.title,
      start: info.event.start,
      end: info.event.end,
      allDay: true,
    };
  };

  deleteEvent = (info: EventRemoveArg): void => {
    info.event.remove();
  };
}
