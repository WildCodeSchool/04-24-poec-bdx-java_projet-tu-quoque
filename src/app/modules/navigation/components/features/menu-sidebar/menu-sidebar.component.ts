import { Component, Input, Renderer2 } from '@angular/core';
import { NavigationService } from '../../../../shared/services/navigation.service';
import { Observable } from 'rxjs';
import { PageNavigation } from '../../../../shared/models/types/navigation/page-navigation.type';
import { inOutAnimation } from '../../../../shared/animations/inOutAnimation';
import { ConnectionService } from '../../../../shared/services/connection/connection.service';

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
    private _renderer: Renderer2,
    private _connectionService: ConnectionService
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

  onClick(e: string) {
    if(e === "Déconnexion") {
      this._connectionService.setUserConnected(null);
      localStorage.removeItem("tokenId");
    }
    this.navService.setSidebarVisible();
  }
}
