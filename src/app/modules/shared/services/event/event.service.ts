import { Injectable } from '@angular/core';
import { ApiRessourceService } from '../api-ressource/api-ressource.service';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { EventClickArg, EventDropArg } from '@fullcalendar/core';
import { EventResizeDoneArg } from '@fullcalendar/interaction';

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

  getEventListByTable$(tableId: number): Observable<any> {
    return this.getAll$().pipe(
      map((events: any) =>
        events.filter((event: any) => event.tableId == tableId)
      ),
      tap((eventListFiltered: any) => this.eventList$.next(eventListFiltered))
    );
  }

  getEnventList$(): Observable<any> {
    return this.eventList$.asObservable();
  }

  addEvent(event: any) {
    const currentEventList: any = this.eventList$.value;
    this.eventList$.next([...currentEventList, event]);
  }

  createNewEvent = (): void => {
    const dateStr = prompt('Ajoutez une date au format YYYY-MM-DD');
    const title = prompt('Ajoutez votre titre');
    const date: Date = new Date(dateStr + 'T00:00:00');
    if (!isNaN(date.valueOf())) {
      const newEvent = {
        title: title,
        start: date,
        allDay: true,
      };
      this.addEvent(newEvent);
      console.log(newEvent);
    }
  };

  showDetail(arg: any) {
    alert(arg.event.title);
  }

  showEventDetail = (arg: EventClickArg): void => this.showDetail(arg);

  eventResize = (info: EventResizeDoneArg): void => {
    console.log(info.event.start);
    console.log(info.event.end);
  };

  moveEvent = (info: EventDropArg): void => {
    console.log(info.event.start);
    console.log(info.event.end);
    if (!confirm('Etes-vous sûr ?')) {
      info.revert();
    }
    console.log('Le nouvel élément aura lieu ' + info.event.start);
  };
}
