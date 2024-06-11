import { DestroyRef, Injectable } from '@angular/core';
import { ApiRessourceService } from '../api-ressource/api-ressource.service';
import { BehaviorSubject, Observable, switchMap, tap } from 'rxjs';
import { EventDropArg } from '@fullcalendar/core';
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

  getEventList$(): Observable<calendarEvent[]> {
    return this.eventList$.asObservable();
  }

  getEventListByTableNew$(tableId: number): Observable<calendarEvent[]> {
    const headers = this.getHeaders();
    return this._http
      .get<calendarEvent[]>(this._BASE_URL + `/get/tableId=${tableId}`, {
        headers,
      })
      .pipe(
        tap((eventList: calendarEvent[]) => this.eventList$.next(eventList)),
        switchMap(() => this.getEventList$())
      );
  }

  addEventNew(tableEvent: calendarEvent, tableId: number): Observable<any> {
    const headers = this.getHeaders();
    const currentEventList: calendarEvent[] = this.eventList$.value;
    const newEvent = this._http
      .post<calendarEvent>(this._BASE_URL + `/add/${tableId}`, tableEvent, {
        headers,
      })
      .pipe(
        tap((event: calendarEvent) =>
          this.eventList$.next([...currentEventList, event])
        )
      );

    return newEvent;
  }

  deleteEvent = (eventId: number): Observable<any> => {
    const headers = this.getHeaders();
    const currentEventList: calendarEvent[] = this.eventList$.value;
    const eventListUpdated = currentEventList.filter(
      (calendarEvent: calendarEvent) => calendarEvent.id !== eventId
    );
    this.eventList$.next(eventListUpdated);
    return this._http.delete(this._BASE_URL + `/delete/${eventId}`, {
      headers,
    });
  };

  eventResize = (info: EventResizeDoneArg): void => {
    const headers = this.getHeaders();
    const eventId = Number(info.oldEvent._def.publicId);
    const modifiedEvent: calendarEvent = {
      tableId: info.oldEvent.extendedProps['tableId'],
      title: info.oldEvent._def.title,
      start: info.event.start,
      end: info.event.end,
      allDay: true,
    };
    this._http
      .patch<calendarEvent>(
        this._BASE_URL + `/patch/${eventId}`,
        modifiedEvent,
        { headers }
      )
      .subscribe();
  };

  moveEvent = (info: EventDropArg): void => {
    const headers = this.getHeaders();
    const eventId = Number(info.oldEvent._def.publicId);
    const movedEvent: calendarEvent = {
      tableId: info.oldEvent.extendedProps['tableId'],
      title: info.oldEvent._def.title,
      start: info.event.start,
      end: info.event.end,
      allDay: true,
    };
    this._http
      .patch<calendarEvent>(this._BASE_URL + `/patch/${eventId}`, movedEvent, {
        headers,
      })
      .subscribe();
  };
}
