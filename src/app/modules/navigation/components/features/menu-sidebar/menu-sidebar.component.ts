import { Component, Input, Renderer2 } from '@angular/core';
import { NavigationService } from '../../../../shared/services/navigation.service';
import { animate, style, transition, trigger } from '@angular/animations';
import { Observable } from 'rxjs';
import { PageNavigation } from '../../../../shared/models/types/navigation/page-navigation.type';

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


  pagesToNavigateList: PageNavigation[] = [
    {name: "Accueil", url: "user"},
    {name: "Personnages", url: "user/characters"},
    {name: "Tables", url: "user/tables"},
    {name: "Mon compte", url: "user/account-management"},
    {name: "Déconnexion", url: ""}
  ]

  isSidebarOpen$: Observable<boolean> = this.navService.getSidebarIsVisible$()

  constructor(
    private navService: NavigationService, 
    private _renderer: Renderer2
  ){}


  ngOnInit(): void {
    this.navService.getSidebarIsVisible$().subscribe((res: boolean) => 
      {if(res) {
        this._renderer.setStyle(document.body, 'overflow', 'hidden')
      } else {
        this._renderer.setStyle(document.body, 'overflow', 'auto')
  
      }}
    )

  }

  onClick() {
    this.navService.setSidebarVisible()

  }

}
