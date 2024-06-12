import { Injectable, inject } from '@angular/core';
import { Observable, map, switchMap } from 'rxjs';
import { Note } from '../../models/types/users/note.type';
import { ConnectionService } from '../connection/connection.service';
import { ApiRessourceService } from '../api-ressource/api-ressource.service';
import { UserInfos } from '../../models/types/users/user-infos';
import { HttpHeaders } from '@angular/common/http';
import { LocalStorageService } from '../connection/local-storage.service';
import { GameTableFullDTO } from '../../models/types/users/table-full-dto';
import { NoteDTO } from '../../models/types/users/note-dto';
import { CharacterFullDTO } from '../../models/types/users/character-full-dto';
import { environment } from '../../../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class NoteService extends ApiRessourceService<Note> {

  private _connectionService = inject(ConnectionService);

  private readonly _BASE_URL: string = environment.baseUrl + '/notes';

  override getRessourceUrl(): string {
    return this._BASE_URL;
  }

  setGameNotes$(): Observable<NoteDTO[] | null> {
    return this._connectionService
      .getCharacterConnectedNew$()
      .pipe(
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
    const headers = this.getHeaders()
    return this._http.get(this._BASE_URL + `/get/note/${id}`, { headers });
  }

  postUserNote(formValue: any, userId: number): Observable<any> {
    const headers = this.getHeaders()
    return this._http.post(this._BASE_URL + `/add/user/${userId}`, formValue, {
      headers,
    });
  }

  postCharacterNote(formValue: any, characterId: number): Observable<NoteDTO> {
    const headers = this.getHeaders();
    return this._http.post<NoteDTO>(
      this._BASE_URL + `/add/character/${characterId}`,
      formValue,
      { headers }
    );
  }

  postTableNote(formValue: any, tableId: number): Observable<NoteDTO> {
    const headers = this.getHeaders();
    return this._http.post<NoteDTO>(
      this._BASE_URL + `/add/table/${tableId}`,
      formValue,
      { headers }
    );
  }
}
