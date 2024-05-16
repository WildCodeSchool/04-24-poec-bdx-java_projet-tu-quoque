import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Note } from '../../models/types/users/note.type';

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  
  private readonly _BASE_URL: string = "http://localhost:3000/notes"

  private readonly _USER_CONECTED = 1

  constructor(private _http: HttpClient) { }


  getNoteList(): Observable<Note[]> {
    return this._http.get<Note[]>(this._BASE_URL)
  }

  getNoteListByUser(): Observable<Note[]> {
    return this.getNoteList()
    .pipe(
      map((result: Note[]) => result.filter((note: Note) => Number(note.user_id) === this._USER_CONECTED))
    )
  }

  getNoteListByCharacter(id: number): Observable<Note[]> {
    return this.getNoteList()
    .pipe(
      map((result: Note[]) => result.filter((note: Note) => Number(note.character_id) === id))
    )
  }

  getNoteById(id: number): Observable<Note> {
    return this.getNoteList()
    .pipe(
      map((result: Note[]) => result.find((note: any) => Number(note.id) === id) as Note)
    )
  }
}
