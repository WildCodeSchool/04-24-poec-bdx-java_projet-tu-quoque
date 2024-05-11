import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Character } from '../../models/types/users/character.type';
import { userApiResponse } from '../../models/types/users/user-api-response.type';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  private readonly _BASE_URL = "/assets/json/users.json";


  constructor(private http: HttpClient) { }

  getUserCharacterList$(): Observable<any> {
    return this.http.get<any>(this._BASE_URL)
    .pipe(
      map((response: any) => {
        return response.users.flatMap((user: any) => user.characters); // utilise flatMap pour "aplatir" les tableaux de personnages de chaque utilisateur en un seul tableau.
      })
    )
  }

  getCharacterById$(id: number): Observable<any> {
    return this.getUserCharacterList$()
      .pipe(
        map(characters => characters.find((character : any) => character.id === id) as Character)
      );
  }
}
