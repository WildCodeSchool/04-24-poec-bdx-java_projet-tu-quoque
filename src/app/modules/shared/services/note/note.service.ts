import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  constructor(private _http: HttpClient) { }

  private _BASE_URL: string = '/assets/json/notes.json'

  getNoteList(): Observable<any> {
    return this._http.get(this._BASE_URL)
    .pipe(
      map((result: any) => result.notes)
    )
  }
  getNoteListByUser(id: number): Observable<any> {
    return this.getNoteList()
    .pipe(
      map((result: any) => result.filter((discussion: any) => discussion.user_id === id))
    )
  }

  getNoteListByCharacter(id: number): Observable<any> {
    return this.getNoteList()
    .pipe(
      map((result: any) => result.filter((discussion: any) => discussion.character_id === id))
    )
  }

  getNoteById(id: number): Observable<any> {
    return this.getNoteList()
    .pipe(
      map((result: any) => result.find((note: any) => note.id === id))
    )
  }
}
