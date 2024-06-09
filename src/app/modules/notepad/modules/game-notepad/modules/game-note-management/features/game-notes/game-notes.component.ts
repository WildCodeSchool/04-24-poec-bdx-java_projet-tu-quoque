import { Component } from '@angular/core';
import { Observable, map, mergeMap, switchMap } from 'rxjs';
import { NoteService } from '../../../../../../../shared/services/note/note.service';
import { Note } from '../../../../../../../shared/models/types/users/note.type';
import { ConnectionService } from '../../../../../../../shared/services/connection/connection.service';
import { Table } from '../../../../../../../shared/models/types/users/table.type';
import { Character } from '../../../../../../../shared/models/types/users/character.type';
import { GameTableDTO } from '../../../../../../../shared/models/types/users/table-dto';
import { CharacterFullDTO } from '../../../../../../../shared/models/types/users/character-full-dto';
import { GameTableFullDTO } from '../../../../../../../shared/models/types/users/table-full-dto';
import { NoteDTO } from '../../../../../../../shared/models/types/users/note-dto';

@Component({
  selector: 'app-game-notes',
  templateUrl: './game-notes.component.html',
  styleUrl: './game-notes.component.scss',
})
export class GameNotesComponent {
  noteList$!: Observable<Note[]>;
  noteListNew$!: Observable<NoteDTO[] | null>;

  tableConnected$: Observable<Table> =
    this._connectionService.getTableConnected$() as Observable<Table>;

  characterConnected$: Observable<Character> =
    this._connectionService.getCharacterConnected$() as Observable<Character>;

  tableConnectedNew$: Observable<GameTableDTO> =
    this._connectionService.getTableConnectedNew$() as Observable<GameTableDTO>;

  characterConnectedNew$: Observable<CharacterFullDTO> =
    this._connectionService.getCharacterConnectedNew$() as Observable<CharacterFullDTO>;

  constructor(
    private _notesService: NoteService,
    private _connectionService: ConnectionService
  ) {}

  ngOnInit(): void {
    this.noteList$ = this.characterConnected$.pipe(
      switchMap((response) =>
        response == null
          ? this._notesService.getNoteListByTable()
          : this._notesService.getNoteListByCharacter()
      )
    );
    this.noteListNew$ = this.characterConnectedNew$.pipe(
      switchMap((response) =>
        response == null
          ? this._connectionService
              .getTableConnectedNew$()
              .pipe(
                map(
                  (response: GameTableFullDTO | null) =>
                    response?.noteList as NoteDTO[]
                )
              )
          : this._connectionService
              .getCharacterConnectedNew$()
              .pipe(
                map(
                  (response: CharacterFullDTO | null) =>
                    response?.characterNoteList as NoteDTO[]
                )
              )
      )
    );
  }
}
