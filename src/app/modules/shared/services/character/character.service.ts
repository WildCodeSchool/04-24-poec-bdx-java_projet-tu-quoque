import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, switchMap } from 'rxjs';
import { Character } from '../../models/types/users/character.type';
import { ConnectionService } from '../connection/connection.service';
import { UserBasicInfos } from '../../models/types/users/userBasicInfos.type';
import { ApiRessourceService } from '../api-ressource/api-ressource.service';

@Injectable({
  providedIn: 'root',
})
export class CharacterService extends ApiRessourceService<Character> {
  
  private readonly _BASE_URL: string = 'http://localhost:3000/characters';

  private readonly _userConnected$: Observable<UserBasicInfos> =
    this.connectionService.getUserConected$();

  constructor(
    protected override _http: HttpClient,
    private connectionService: ConnectionService
  ) {
    super(_http);
  }

  override getRessourceUrl(): string {
    return this._BASE_URL;
  }

  getUserCharacterList$(): Observable<Character[]> {
    return this.getAll$().pipe(
      switchMap((CharacterList: Character[]) =>
        this._userConnected$.pipe(
          map((user: UserBasicInfos) =>
            CharacterList.filter(
              (character: Character) => character.userId === user.id
            )
          )
        )
      )
    );
  }

  getUserCharacterWithoutTableList$(): Observable<Character[]> {
    return this.getUserCharacterList$().pipe(
      map((response: Character[]) =>
        response.filter((character: Character) => character.tableId === null)
      )
    );
  }

  getCharactersByTable$(tableId: number): Observable<Character[]> {
    return this.getAll$().pipe(
      map((characters: Character[]) =>
        characters.filter(
          (character: Character) => Number(character.tableId) === tableId
        )
      )
    );
  }

  getCharacterToAcceptByTable$(id: number): Observable<Character[]> {
    return this.getCharactersByTable$(id).pipe(
      map((characterList: Character[]) =>
        characterList.filter(
          (character: Character) => character.accepted === false
        )
      )
    );
  }
}
