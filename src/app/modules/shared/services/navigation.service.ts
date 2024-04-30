import { Injectable, Input } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  sidebarHidden: boolean = true

  @Input() isSideBarHidden!: boolean

  constructor() { }

}
