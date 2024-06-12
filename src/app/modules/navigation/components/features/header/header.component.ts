import { Component, inject } from '@angular/core';
import { NavigationService } from '../../../../shared/services/navigation.service';
import { Router } from '@angular/router';
import { ConnectionService } from '../../../../shared/services/connection/connection.service';
import { Observable, forkJoin, map } from 'rxjs';
import { CharacterFullDTO } from '../../../../shared/models/types/users/character-full-dto';
import { GameTableFullDTO } from '../../../../shared/models/types/users/table-full-dto';
import { UserInfos } from '../../../../shared/models/types/users/user-infos';

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

  userConnected$: Observable<UserInfos | null> = this._connectionService.getUserConnected$();
  characterConnected$: Observable<CharacterFullDTO | null> = this._connectionService.getCharacterConnectedNew$();
  tableConnected$: Observable<GameTableFullDTO | null> = this._connectionService.getTableConnectedNew$();
  userHomeLink: string = '/user/home';
  visitorHomeLink: string = '/visitor/home';
  urlToGoBack!: string;
  avatar$: Observable<string |undefined> = forkJoin([this.userConnected$, this.characterConnected$, this.tableConnected$]).pipe(
    map(([userConnected, characterConnected, tableConnected]) => {
      if (characterConnected) {
        return characterConnected.avatar;
      } else if (tableConnected) {
        return tableConnected.Avatar;
      } else {
        return userConnected?.avatar;
      }
    }))

  goToNotepad(): void {
    localStorage.setItem('routeToGoBack', this._router.url);
    this._router.navigateByUrl('notepad');
  }
  onClick() {
    window.scrollTo(0, 0);
    this._navigationService.setSidebarVisible();
  }

  goToDiceRoll() {
    this._router.navigateByUrl('dice-roll');
  }
}
