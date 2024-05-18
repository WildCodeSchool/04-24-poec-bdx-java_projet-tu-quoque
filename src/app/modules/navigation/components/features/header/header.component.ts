import { Component } from '@angular/core';
import { NavigationService } from '../../../../shared/services/navigation.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  
  title: string = 'tu quoque';
  userConected: boolean = true;
  homeLink: string = this.userConected ? '/user/home':'/visitor/home';
  urlToGoBack!: string

  constructor(private _navService: NavigationService, private router: Router) {}


  storeActualUrl(): void {
    localStorage.setItem("routeToGoBack", this.router.url)
  }
  onClick() {
    window.scrollTo(0, 0);
    this._navService.setSidebarVisible();
  }
}
