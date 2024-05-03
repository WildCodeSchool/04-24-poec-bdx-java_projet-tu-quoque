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

  constructor(private navService: NavigationService) {}

  onClick() {
    this.navService.setSidebarVisible();
  }
}
