import { Component, Input } from '@angular/core';
import { NavigationService } from '../../../../shared/services/navigation.service';
import { animate, style, transition, trigger } from '@angular/animations';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-menu-sidebar',
  templateUrl: './menu-sidebar.component.html',
  styleUrl: './menu-sidebar.component.scss',
  animations: [
    trigger(
      'inOutAnimation', 
      [
        transition(
          ':enter', 
          [
            style({opacity: 0 }),
            animate('0.2s ease-out', 
                    style({ height: 300, opacity: 1 }))
          ]
        ),
        transition(
          ':leave', 
          [
            style({opacity: 1 }),
            animate('0.2s ease-in', 
                    style({ height: 0, opacity: 0 }))
          ]
        )
      ]
    )
  ]
})
export class MenuSidebarComponent {


  pagesToNavigateList: any = [
    {name: "Accueil", url: "user"},
    {name: "Personnages", url: "user/characters"},
    {name: "Tables", url: "user/tables"},
    {name: "Mon compte", url: "user/account"},
    {name: "Déconnexion", url: ""}
  ]

  isSidebarOpen$: Observable<boolean> = this.navService.getSidebarIsVisible$()

  constructor(private navService: NavigationService){}


  onClick() {
    this.navService.setSidebarVisible()
  }

}
