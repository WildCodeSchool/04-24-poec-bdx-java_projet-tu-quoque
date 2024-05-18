import { Component, EventEmitter, Output } from '@angular/core';
import { ConnectionService } from '../../../shared/services/connection/connection.service';
import { Observable } from 'rxjs';
import { Character } from '../../../shared/models/types/users/character.type';
import { Table } from '../../../shared/models/types/users/table.type';
import { Router } from '@angular/router';

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

  urlBeforeNotepad!: string

  @Output()
  areNotesVisible: EventEmitter<boolean> = new EventEmitter();

  constructor(
    private _connectionService: ConnectionService,
    private _router: Router
  ) {}

  closeNotes(): void {
    this.urlBeforeNotepad = localStorage.getItem("routeToGoBack") as string;
    this._router.navigateByUrl(this.urlBeforeNotepad)
    // this.areNotesVisible.emit(false);
  }

  setUserSelected(event: boolean) {
    this.isUserSelected = event;
  }
}
