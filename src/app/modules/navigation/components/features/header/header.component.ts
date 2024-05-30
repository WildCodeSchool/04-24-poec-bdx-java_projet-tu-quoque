import { Component, inject } from '@angular/core';
import { NavigationService } from '../../../../shared/services/navigation.service';
import { Router } from '@angular/router';
import { ConnectionService } from '../../../../shared/services/connection/connection.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  
  title: string = 'tu quoque';

  private _navigationService = inject(NavigationService)
  private _connectionService = inject(ConnectionService)
  private _router = inject(Router)

  userConected: boolean = true;
  userConnected$ = this._connectionService.getUserConected$()
  userHomeLink: string = '/user/home'
  visitorHomeLink: string ='/visitor/home'
  urlToGoBack!: string;

  storeActualUrl(): void {
    localStorage.setItem('routeToGoBack', this._router.url);
  }
  onClick() {
    window.scrollTo(0, 0);
    this._navigationService.setSidebarVisible();
  }
}
