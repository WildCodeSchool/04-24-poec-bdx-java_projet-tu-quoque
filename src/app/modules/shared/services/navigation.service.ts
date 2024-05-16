import { Injectable, Input } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { PageNavigation } from '../models/types/navigation/page-navigation.type';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  
  isSidebarVisible$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor() {}

  PageNavigationList: PageNavigation[] = [
    { name: 'Accueil', url: 'user' },
    { name: 'Personnages', url: 'user/characters' },
    { name: 'Tables', url: 'user/tables' },
    { name: 'Mon compte', url: 'user/account-management' },
    { name: 'Déconnexion', url: '' },
  ];

  setSidebarVisible(): void {
    this.isSidebarVisible$.next(!this.isSidebarVisible$.value);
  }

  getSidebarIsVisible$(): Observable<boolean> {
    return this.isSidebarVisible$.asObservable();
  }

  setPageNavigationList(): PageNavigation[] {
    return this.PageNavigationList;
  }
}
