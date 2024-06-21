import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, map, of, shareReplay, switchMap, tap } from 'rxjs';
import { Note } from '../../models/types/users/note.type';
import { ConnectionService } from '../connection/connection.service';
import { ApiRessourceService } from '../api-ressource/api-ressource.service';
import { GameTableFullDTO } from '../../models/types/users/table-full-dto';
import { NoteDTO } from '../../models/types/users/note-dto';
import { environment } from '../../../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class NoteService extends ApiRessourceService<Note> {

   private _gameTableNotes$: BehaviorSubject<NoteDTO[]> = new BehaviorSubject<
    NoteDTO[]
  >([]);
  private _tableNoteList: NoteDTO[] = [];

  private _connectionService = inject(ConnectionService);

  private readonly _BASE_URL: string = environment.baseUrl + '/notes';

  override getRessourceUrl(): string {
    return this._BASE_URL;
  }

  setGameNotes$(): Observable<NoteDTO[]> {
    return this._connectionService
      .getCharacterConnectedNew$()
      .pipe(
        switchMap((response) => {

          if (!response) {
           return this._connectionService.getTableConnectedNew$().pipe(
              map((response: GameTableFullDTO | null) => {
                this._tableNoteList = response?.noteList as NoteDTO[];
                this._gameTableNotes$.next(this._tableNoteList);
                return this._tableNoteList;
              })
            );
          }

          this._gameTableNotes$.next(response?.characterNoteList as NoteDTO[]);
          this._tableNoteList = response?.characterNoteList as NoteDTO[];
          return of(this._tableNoteList);
        })
      );
  }


  getTableNoteList$(): BehaviorSubject<NoteDTO[]> {
    return this._gameTableNotes$;
  };

  getNoteById$(id: number): Observable<any> {
    const headers = this.getHeaders();
    return this._http.get(this._BASE_URL + `/get/note/${id}`, { headers });
  };

  postUserNote(formValue: any, userId: number): Observable<any> {
    const headers = this.getHeaders();
    return this._http.post(this._BASE_URL + `/add/user/${userId}`, formValue, {
      headers,
    });
  };

  postCharacterNote(formValue: any, characterId: number): Observable<NoteDTO> {
    const headers = this.getHeaders();
    return this._http.post<NoteDTO>(
      this._BASE_URL + `/add/character/${characterId}`,
      formValue,
      { headers }
    )
      .pipe(
        tap((newNote: NoteDTO) => {
          this._tableNoteList = [...this._tableNoteList, newNote];
          this._gameTableNotes$.next([...this._gameTableNotes$.value, newNote]);
        })
      );
  };

  postTableNote(formValue: any, tableId: number): Observable<NoteDTO> {
    const headers = this.getHeaders();
    return this._http.post<NoteDTO>(
      this._BASE_URL + `/add/table/${tableId}`,
      formValue,
      { headers }
    )
      .pipe(
        tap((newNote: NoteDTO) => {
          this._tableNoteList = [...this._tableNoteList, newNote];
          this._gameTableNotes$.next(this._tableNoteList);
        }
        )
      );
  }
}
