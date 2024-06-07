import { Injectable, inject } from '@angular/core';
import { Observable, map, switchMap } from 'rxjs';
import { Note } from '../../models/types/users/note.type';
import { ConnectionService } from '../connection/connection.service';
import { UserBasicInfos } from '../../models/types/users/user-basic-infos.type';
import { Table } from '../../models/types/users/table.type';
import { Character } from '../../models/types/users/character.type';
import { ApiRessourceService } from '../api-ressource/api-ressource.service';
import { UserInfos } from '../../models/types/users/user-infos';

@Injectable({
  providedIn: 'root',
})
export class NoteService extends ApiRessourceService<Note> {
  
  private _connectionService = inject(ConnectionService);

  private readonly _BASE_URL: string = 'http://localhost:3000/notes';

  private readonly _userConnected$: Observable<UserInfos> =
    this._connectionService.getUserConnected$() as Observable<UserInfos>;

  private readonly _tableConected$: Observable<Table> =
    this._connectionService.getTableConnected$() as Observable<Table>;

  private readonly _characterConnected$: Observable<Character> =
    this._connectionService.getCharacterConnected$() as Observable<Character>;

  override getRessourceUrl(): string {
    return this._BASE_URL;
  }

  getNoteListByUser(): Observable<Note[]> {
    return this.getAll$().pipe(
      switchMap((noteList: Note[]) =>
        this._userConnected$.pipe(
          map((user: UserInfos) =>
            noteList.filter((note: Note) => note.userId === user.id)
          )
        )
      )
    );
  }

  getNoteListByCharacter(): Observable<Note[]> {
    return this.getAll$().pipe(
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
    return this.getAll$().pipe(
      switchMap((noteList: Note[]) =>
        this._tableConected$.pipe(
          map((table: Table) =>
            noteList.filter((note: Note) => note.tableId === table.id)
          )
        )
      )
    );
  }
}
