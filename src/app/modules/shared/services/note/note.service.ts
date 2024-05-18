import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, switchMap } from 'rxjs';
import { Note } from '../../models/types/users/note.type';
import { ConnectionService } from '../connection/connection.service';
import { User } from '../../models/types/users/user.types';
import { UserBasicInfos } from '../../models/types/users/userBasicInfos.type';

@Injectable({
  providedIn: 'root',
})
export class NoteService {
  
  private readonly _BASE_URL: string = 'http://localhost:3000/notes';

  private readonly _userConnected$: Observable<UserBasicInfos> =
    this.connectionService.getUserConected$();

  constructor(
    private _http: HttpClient,
    private connectionService: ConnectionService
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

  getNoteListByCharacter(id: number): Observable<Note[]> {
    return this.getNoteList().pipe(
      switchMap((noteList: Note[]) =>
        this._userConnected$.pipe(
          map((user: UserBasicInfos) =>
            noteList.filter((note: Note) => note.characterId === user.id)
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
