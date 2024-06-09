import { Injectable, inject } from '@angular/core';
import { Observable, map, switchMap } from 'rxjs';
import { Note } from '../../models/types/users/note.type';
import { ConnectionService } from '../connection/connection.service';
import { ApiRessourceService } from '../api-ressource/api-ressource.service';
import { UserInfos } from '../../models/types/users/user-infos';
import { environment } from '../../../../../environments/environment.development';
import { HttpHeaders } from '@angular/common/http';
import { LocalStorageService } from '../connection/local-storage.service';
import { GameTableFullDTO } from '../../models/types/users/table-full-dto';
import { NoteDTO } from '../../models/types/users/note-dto';
import { CharacterFullDTO } from '../../models/types/users/character-full-dto';

@Injectable({
  providedIn: 'root',
})
export class NoteService extends ApiRessourceService<Note> {
  
  private _connectionService = inject(ConnectionService);
  private _localStorageService = inject(LocalStorageService)

  private readonly _BASE_URL: string = environment.baseUrl + '/notes';

  private readonly _userConnected$: Observable<UserInfos> =
    this._connectionService.getUserConnected$() as Observable<UserInfos>;

  override getRessourceUrl(): string {
    return this._BASE_URL;
  }

  setGameNotes$(): Observable<NoteDTO[] | null> {
    return this._connectionService.getCharacterConnectedNew$().pipe(
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

  getNoteById$(id: number): Observable<any> {
    const token = this._localStorageService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this._http.get(this._BASE_URL + `/get/note/${id}`, { headers });
  };

  postUserNote(formValue: Object, userId: number) {
    const token = this._localStorageService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this._http.post(
      this._BASE_URL + `/add/user/${userId}`,
      formValue,
      { headers }
    )
  }

}
