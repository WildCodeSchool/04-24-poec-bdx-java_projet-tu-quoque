import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, switchMap } from 'rxjs';
import { Note } from '../../models/types/users/note.type';
import { ConnectionService } from '../connection/connection.service';
import { UserBasicInfos } from '../../models/types/users/userBasicInfos.type';
import { Table } from '../../models/types/users/table.type';
import { Character } from '../../models/types/users/character.type';

@Injectable({
  providedIn: 'root',
})
export class NoteService {

  private readonly _BASE_URL: string = 'http://localhost:3000/notes';

  private readonly _userConnected$: Observable<UserBasicInfos> =
    this._connectionService.getUserConected$();

  private readonly _tableConected$: Observable<Table> =
    this._connectionService.getTableConnected$();

  private readonly _characterConnected$: Observable<Character> =
    this._connectionService.getCharacterConnected$();

  constructor(
    private _http: HttpClient,
    private _connectionService: ConnectionService
  ) {}

  getNoteList(): Observable<Note[]> {
    return this._http.get<Note[]>(this._BASE_URL);
  }

  getNoteListByUser(): Observable<Note[]> {
    return this.getNoteList().pipe(
      switchMap((noteList: Note[]) =>
        this._userConnected$.pipe(
          map((user: UserBasicInfos) =>
            noteList.filter((note: Note) => note.userId === user.id)
          )
        )
      )
    );
  }

  getNoteListByCharacter(): Observable<Note[]> {
    return this.getNoteList().pipe(
      switchMap((noteList: Note[]) =>
        this._characterConnected$.pipe(
          map((character: Character) =>
            noteList.filter((note: Note) => note.characterId === character.id)
          )
        )
      )
    );
  }

  getNoteListByTable(): Observable<Note[]> {
    return this.getNoteList().pipe(
      switchMap((noteList: Note[]) =>
        this._tableConected$.pipe(
          map((table: Table) =>
            noteList.filter((note: Note) => note.tableId === table.id)
          )
        )
      )
    );
  }

  getNoteById(id: number): Observable<Note> {
    return this.getNoteList().pipe(
      map(
        (result: Note[]) =>
          result.find((note: any) => Number(note.id) === id) as Note
      )
    );
  }
}
