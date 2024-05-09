import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Characters } from '../../models/types/users/characters.type';
import { usersApiResponse } from '../../models/types/users/users-api-response.type';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  private readonly _BASE_URL = "/assets/json/users.json";

  constructor(private http: HttpClient) { }

  getUserCharacterList$(): Observable<Characters[]> {
    return this.http.get<any>(this._BASE_URL)
    .pipe(
      map((response: usersApiResponse) => {
        return response.users.flatMap(user => user.characters); // utilise flatMap pour "aplatir" les tableaux de personnages de chaque utilisateur en un seul tableau.
      })
    )
  }

  getCharacterById$(id: number): Observable<Characters> {
    return this.getUserCharacterList$()
      .pipe(
        map(characters => characters.find(character => character.id === id) as Characters)
      );
  }
}
