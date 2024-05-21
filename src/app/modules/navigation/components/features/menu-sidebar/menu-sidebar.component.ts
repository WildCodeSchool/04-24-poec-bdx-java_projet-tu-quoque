import { Component, Input, Renderer2 } from '@angular/core';
import { NavigationService } from '../../../../shared/services/navigation.service';
import { animate, style, transition, trigger } from '@angular/animations';
import { Observable } from 'rxjs';
import { PageNavigation } from '../../../../shared/models/types/navigation/page-navigation.type';
import { inOutAnimation } from '../../../../shared/animations/inOutAnimation';

@Component({
  selector: 'app-menu-sidebar',
  templateUrl: './menu-sidebar.component.html',
  styleUrl: './menu-sidebar.component.scss',
  animations: [inOutAnimation],
})
export class MenuSidebarComponent {
  
  pagesToNavigateList: PageNavigation[] =
    this.navService.setPageNavigationList();

  isSidebarOpen$: Observable<boolean> = this.navService.getSidebarIsVisible$();

  constructor(
    private navService: NavigationService,
    private _renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.navService.getSidebarIsVisible$().subscribe((res: boolean) => {
      if (res) {
        this._renderer.setStyle(document.body, 'overflow', 'hidden');
      } else {
        this._renderer.setStyle(document.body, 'overflow', 'auto');
      }
    });
  }

  onClick() {
    this.navService.setSidebarVisible();
  }
}
