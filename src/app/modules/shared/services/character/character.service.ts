import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import { Character } from '../../models/types/users/character.type';
import { userApiResponse } from '../../models/types/users/user-api-response.type';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  private readonly _BASE_URL: string = "http://localhost:3000/characters"

  private readonly _USER_CONECTED: number = 1

  constructor(private http: HttpClient) { }

  getAllUsers$(): Observable<any> {
    return this.http.get<any>(this._BASE_URL)
  }

  getUserCharacterList$(): Observable<Character[]> {
    return this.getAllUsers$()
    .pipe(
      map((response: Character[]) => 
        response.filter((res: Character) => res.user_id === this._USER_CONECTED)
      )
    )
  }

  getCharacterById$(characterId: number): Observable<Character> {
    return this.getUserCharacterList$()
      .pipe(
        map((characters: Character[]) => characters.find((character : Character) => Number(character.id) === characterId) as Character)
      );
  }

  getCharactersByTable$(tableId: number): Observable<Character[]> {
    return this.getAllUsers$()
    .pipe(
      map((characters: Character[]) => characters.filter((character: Character) => Number(character.table_id) === tableId))
    )
  }
}
