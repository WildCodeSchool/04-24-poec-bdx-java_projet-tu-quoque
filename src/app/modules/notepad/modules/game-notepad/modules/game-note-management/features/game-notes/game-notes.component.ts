import { Component } from '@angular/core';
import { Observable, mergeMap, switchMap } from 'rxjs';
import { NoteService } from '../../../../../../../shared/services/note/note.service';
import { Note } from '../../../../../../../shared/models/types/users/note.type';
import { ConnectionService } from '../../../../../../../shared/services/connection/connection.service';
import { Table } from '../../../../../../../shared/models/types/users/table.type';
import { Character } from '../../../../../../../shared/models/types/users/character.type';

@Component({
  selector: 'app-game-notes',
  templateUrl: './game-notes.component.html',
  styleUrl: './game-notes.component.scss',
})
export class GameNotesComponent {

  noteList$!: Observable<Note[]>;

  tableConnected$: Observable<Table> =
    this._connectionService.getTableConnected$();

  characterConnected$: Observable<Character> =
    this._connectionService.getCharacterConnected$();

  constructor(
    private _notesService: NoteService,
    private _connectionService: ConnectionService
  ) {}

  ngOnInit(): void {
    this.noteList$ = this.characterConnected$.pipe(
      switchMap((response) =>
        response.name === 'NoCharacter'
          ? this._notesService.getNoteListByTable()
          : this._notesService.getNoteListByCharacter()
      )
    );
  }
}
