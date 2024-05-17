import { Component, EventEmitter, Output } from '@angular/core';
import { NavigationService } from '../../../../shared/services/navigation.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  
  title: string = 'tu quoque';
  notesVisible: boolean = false;
  userConected: boolean = true;
  UrlLink: string = this.userConected ? '/user/home':'/visitor/home';

  constructor(private navService: NavigationService) {}

  onClick() {
    window.scrollTo(0, 0);
    this.navService.setSidebarVisible();
  }

  closeNotePage(): void {
    this.notesVisible = false;
  }
}
