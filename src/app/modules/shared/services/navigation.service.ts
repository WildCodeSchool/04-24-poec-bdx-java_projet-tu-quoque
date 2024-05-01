import { Injectable, Input } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {


  isSidebarVisible$: BehaviorSubject<boolean> = new BehaviorSubject(false)

  constructor() {}

  setSidebarVisible(): void {
    this.isSidebarVisible$.next(!this.isSidebarVisible$.value)
  }

  getSidebarIsVisible$(): Observable<boolean> {
    return this.isSidebarVisible$.asObservable()
  }
}
