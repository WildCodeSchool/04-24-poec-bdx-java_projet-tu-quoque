import { Component, EventEmitter, Output } from '@angular/core';
import { ConnectionService } from '../../../shared/services/connection/connection.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { GameTableFullDTO } from '../../../shared/models/types/users/table-full-dto';
import { CharacterFullDTO } from '../../../shared/models/types/users/character-full-dto';

@Component({
  selector: 'app-notepad-main-page',
  templateUrl: './notepad-main-page.component.html',
  styleUrl: './notepad-main-page.component.scss',
})
export class NotepadMainPageComponent {
  
  tableConnected$: Observable<GameTableFullDTO> =
    this._connectionService.getTableConnectedNew$() as Observable<GameTableFullDTO>;
  characterConnected$: Observable<CharacterFullDTO> =
    this._connectionService.getCharacterConnectedNew$() as Observable<CharacterFullDTO>;
  isUserSelected: Boolean = true;
  private _urlBeforeNotepad!: string;

  constructor(
    private _connectionService: ConnectionService,
    private _router: Router
  ) {}

  closeNotes(): void {
    localStorage.getItem('routeToGoBack')
      ? (this._urlBeforeNotepad = localStorage.getItem(
          'routeToGoBack'
        ) as string)
      : (this._urlBeforeNotepad = '/');
    this._router.navigateByUrl(this._urlBeforeNotepad);
    localStorage.removeItem('routeToGoBack');
  }

  setUserSelected(event: boolean) {
    this.isUserSelected = event;
  }
}
