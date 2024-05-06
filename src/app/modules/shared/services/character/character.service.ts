import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  constructor(private http: HttpClient) { }

  getUserCharacterList(): Observable<any> {
    return this.http.get<any>("/assets/json/users.json")
    .pipe(
      map((response: any) => response.characters)
    )
  }

  getCharacterById(id: number): Observable<any> {
    return this.getUserCharacterList()
      .pipe(
        map((result: any) => result.find((character: any) => character.id === id))
      )
  }
}
