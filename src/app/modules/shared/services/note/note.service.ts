import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  
  private readonly _BASE_URL: string = "http://localhost:3000/notes"

  private readonly _USER_CONECTED = 1

  constructor(private _http: HttpClient) { }


  getNoteList(): Observable<any> {
    return this._http.get(this._BASE_URL)
  }

  getNoteListByUser(): Observable<any> {
    return this.getNoteList()
    .pipe(
      map((result: any) => result.filter((discussion: any) => Number(discussion.user_id) === this._USER_CONECTED))
    )
  }

  getNoteListByCharacter(id: number): Observable<any> {
    return this.getNoteList()
    .pipe(
      map((result: any) => result.filter((discussion: any) => Number(discussion.character_id) === id))
    )
  }

  getNoteById(id: number): Observable<any> {
    return this.getNoteList()
    .pipe(
      map((result: any) => result.find((note: any) => Number(note.id) === id))
    )
  }
}
