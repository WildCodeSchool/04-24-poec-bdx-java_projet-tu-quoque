import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import { Character } from '../../models/types/users/character.type';
import { userApiResponse } from '../../models/types/users/user-api-response.type';
import { User } from '../../models/types/users/user.types';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  private readonly _BASE_URL: string = "http://localhost:3000/characters"

  private readonly _USER_CONECTED: number = 1

  constructor(private http: HttpClient) { }

  getAllCharacters$(): Observable<Character[]> {
    return this.http.get<Character[]>(this._BASE_URL)
  }

  getUserCharacterList$(): Observable<Character[]> {
    return this.getAllCharacters$()
    .pipe(
      map((response: Character[]) => 
        response.filter((res: Character) => res.user_id === this._USER_CONECTED)
      )
    )
  }

  getUserCharacterWithoutTableList$(): Observable<Character[]> {
    return this.getUserCharacterList$()
    .pipe(
      map((response: Character[]) => response.filter((character: Character) => character.table_id === null))
    )
  }

  getCharacterById$(characterId: number): Observable<Character> {
    return this.getUserCharacterList$()
      .pipe(
        map((characters: Character[]) => characters.find((character : Character) => Number(character.id) === characterId) as Character)
      );
  }

  getCharactersByTable$(tableId: number): Observable<Character[]> { //A modifier : joueurs invités + personnages acceptés
    return this.getAllCharacters$()
    .pipe(
      map((characters: Character[]) => characters.filter((character: Character) => Number(character.table_id) === tableId))
    )
  }

  getCharacterToAcceptByTable$(id: number): Observable<Character[]> {
    return this.getCharactersByTable$(id)
    .pipe(
      map((characterList: Character[]) => characterList.filter((character: Character) => character.accepted === false))
    )
  }
}
