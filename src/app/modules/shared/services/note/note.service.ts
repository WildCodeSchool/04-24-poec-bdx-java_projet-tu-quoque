import { DestroyRef, Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, map, of, switchMap, tap } from 'rxjs';
import { Note } from '../../models/types/users/note.type';
import { ConnectionService } from '../connection/connection.service';
import { ApiRessourceService } from '../api-ressource/api-ressource.service';
import { GameTableFullDTO } from '../../models/types/users/table-full-dto';
import { NoteDTO } from '../../models/types/users/note-dto';
import { CharacterFullDTO } from '../../models/types/users/character-full-dto';
import { environment } from '../../../../../environments/environment.development';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class NoteService extends ApiRessourceService<Note> {
  
  private _gameTableNotes$: BehaviorSubject<NoteDTO[] | null> = new BehaviorSubject<NoteDTO[] | null>(null);
  private _tableNoteList: NoteDTO[] = [];

  private _connectionService = inject(ConnectionService);
  private _destroyRef: DestroyRef = inject(DestroyRef);

  private readonly _BASE_URL: string = environment.baseUrl + '/notes';

  override getRessourceUrl(): string {
    return this._BASE_URL;
  }

  setGameNotes$(): void {
    this._connectionService
      .getCharacterConnectedNew$()
      .pipe(
        switchMap((character: CharacterFullDTO | null) => {
          if (character !== null) {
            return this.getNoteListByCharacter$(character.id).pipe(
              map((notes: NoteDTO[]) => {
                this._tableNoteList = notes;
                this._gameTableNotes$.next(notes);
              })
            );
          } else {
            return this._connectionService.getTableConnectedNew$().pipe(
              switchMap((table: GameTableFullDTO | null) => {
                if (table !== null) {
                  return this.getNoteListByTable$(table.id).pipe(
                    map((notes: NoteDTO[]) => {
                      this._tableNoteList = notes;
                      this._gameTableNotes$.next(notes);
                    })
                  );
                } else {
                  this._tableNoteList = [];
                  this._gameTableNotes$.next(null);
                  return of(null);

                }
              })
            );
          }
        })
      )
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe();
}


  getTableNoteList$(): Observable<NoteDTO[] | null> {
    return this._gameTableNotes$.asObservable();
  }

  getNoteById$(id: number): Observable<any> {
    const headers = this.getHeaders();
    return this._http.get(this._BASE_URL + `/get/note/${id}`, { headers });
  }

  getNoteListByCharacter$(id: number): Observable<NoteDTO[]> {
    const headers = this.getHeaders();
    return this._http.get<NoteDTO[]>(this._BASE_URL + `/get/note/characterId=${id}`, { headers })
  }

  getNoteListByTable$(id: number): Observable<NoteDTO[]> {
    const headers = this.getHeaders();
    return this._http.get<NoteDTO[]>(this._BASE_URL + `/get/note/tableId=${id}`, { headers })

  }

  postUserNote(formValue: any, userId: number): Observable<any> {
    const headers = this.getHeaders();
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
    )
    .pipe(
      tap((newNote: NoteDTO) => {
        this._tableNoteList = [...this._tableNoteList, newNote]
        this._gameTableNotes$.next(this._tableNoteList)
      })
    )
  }

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
        console.log(this._tableNoteList)
        this._gameTableNotes$.next(this._tableNoteList)
      }
      )
    )
  }
}
