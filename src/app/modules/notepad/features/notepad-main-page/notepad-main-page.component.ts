import { Component, EventEmitter, Output } from '@angular/core';
import { ConnectionService } from '../../../shared/services/connection/connection.service';
import { Observable } from 'rxjs';
import { UserBasicInfos } from '../../../shared/models/types/users/userBasicInfos.type';
import { Character } from '../../../shared/models/types/users/character.type';
import { Table } from '../../../shared/models/types/users/table.type';

@Component({
  selector: 'app-notepad-main-page',
  templateUrl: './notepad-main-page.component.html',
  styleUrl: './notepad-main-page.component.scss',
})
export class NotepadMainPageComponent {
  
  fakeCharacterConnected$: Observable<Character> =
    this._connectionService.getCharacterConnected$();

  fakeTableConnected$: Observable<Table> =
    this._connectionService.getTableConnected$();

  isUserSelected: Boolean = true;

  @Output()
  areNotesVisible: EventEmitter<boolean> = new EventEmitter();

  constructor(private _connectionService: ConnectionService) {}

  closeNotes(): void {
    this.areNotesVisible.emit(false);
  }

  setUserSelected(event: boolean) {
    this.isUserSelected = event;
  }
}
