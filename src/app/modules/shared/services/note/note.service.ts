import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  constructor(private _http: HttpClient) { }

  private _HTTP_BASE: string = '/assets/json/notes.json'

  getNoteList(): Observable<any> {
    return this._http.get(this._HTTP_BASE)
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
}
