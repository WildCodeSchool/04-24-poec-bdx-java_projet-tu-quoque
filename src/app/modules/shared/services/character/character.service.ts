import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map, switchMap } from 'rxjs';
import { Character } from '../../models/types/users/character.type';
import { ConnectionService } from '../connection/connection.service';
import { UserBasicInfos } from '../../models/types/users/user-basic-infos.type';
import { ApiRessourceService } from '../api-ressource/api-ressource.service';
import { environment } from '../../../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class CharacterService extends ApiRessourceService<Character> {

  private _connectionService = inject(ConnectionService);

  private readonly _BASE_URL: string = 'http://localhost:3000/characters';
  
  private readonly _BASE_URL_NEW: string = environment.baseUrl;

  private readonly _userConnected$: Observable<UserBasicInfos> =
    this._connectionService.getUserConnected$() as Observable<UserBasicInfos>;

  override getRessourceUrl(): string {
    return this._BASE_URL;
  }

  getUserCharacterListNew$(id: number): Observable<any> {
    return this._http.get(this._BASE_URL_NEW + `/character/${id}`)
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
