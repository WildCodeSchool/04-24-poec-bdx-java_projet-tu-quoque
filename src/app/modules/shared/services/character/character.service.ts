import { HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map, switchMap } from 'rxjs';
import { ConnectionService } from '../connection/connection.service';
import { ApiRessourceService } from '../api-ressource/api-ressource.service';
import { environment } from '../../../../../environments/environment.development';
import { LocalStorageService } from '../connection/local-storage.service';
import { UserInfos } from '../../models/types/users/user-infos';
import { CharacterFullDTO } from '../../models/types/users/character-full-dto';
import { Character } from '../../models/types/users/character.type';
import { UserBasicInfos } from '../../models/types/users/user-basic-infos.type';

@Injectable({
  providedIn: 'root',
})
export class CharacterService extends ApiRessourceService<Character> {

  private _connectionService = inject(ConnectionService);
  private _localStorageService = inject(LocalStorageService)

  private readonly _BASE_URL: string = 'http://localhost:3000/characters';
  private readonly _BASE_URL_NEW: string = environment.baseUrl + '/characters';

  private readonly _userConnected$ =
    this._connectionService.getUserConnected$() as Observable<UserInfos>;

  override getRessourceUrl(): string {
    return this._BASE_URL;
  }

  private getHeaders(): HttpHeaders {
    const token = this._localStorageService.getToken();
    return new HttpHeaders({
      "Authorization": `Bearer ${token}`
    });
  }

  // Inutilisable : 
  // getUserCharacterListNew$(id: number): Observable<CharacterFullDTO[]> {
  //   const headers = this.getHeaders();
  //   return this._http.get<CharacterFullDTO[]>(`${this._BASE_URL_NEW}/get/userId=${id}`, { headers });
  // }

  getUserCharacterById$(id: number): Observable<any>{
    const headers = this.getHeaders()
    return this._http.get(this._BASE_URL_NEW + `/get/${id}`, { headers })
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
 
//  Porposition :
  // getUserCharacterWithoutTableList$(id: number): Observable<CharacterFullDTO[]> {
  //   return this.getUserCharacterListNew$(id).pipe(
  //     map((response: CharacterFullDTO[]) =>
  //       response.filter((character: CharacterFullDTO) => character.gameTable === null)
  //     )
  //   );
  // } 


 
  
  getCharactersByTable$(tableId: number): Observable<Character[]> {
    return this.getAll$().pipe(
      map((characters: Character[]) =>
        characters.filter(
          (character: Character) => Number(character.tableId) === tableId
        )
      )
    );
  }

  // Proposition : 
  // getCharactersByTableNew$(tableId: number): Observable<CharacterFullDTO[]> {
  //   const headers = this.getHeaders();
  //   return this._http.get<CharacterFullDTO[]>(`${this._BASE_URL}/table/${tableId}`, { headers });
  // }

  getCharacterToAcceptByTable$(id: number): Observable<Character[]> {
    return this.getCharactersByTable$(id).pipe(
      map((characterList: Character[]) =>
        characterList.filter(
          (character: Character) => character.accepted === false
        )
      )
    );
  }

  // Proposition : 
  // getCharacterToAcceptByTable$(tableId: number): Observable<CharacterFullDTO[]> {
  //   return this.getCharactersByTableNew$(tableId).pipe(
  //     map((characterList: CharacterFullDTO[]) =>
  //       characterList.filter(
  //         (character: CharacterFullDTO) => character.accepted === false
  //       )
  //     )
  //   );
  // }
}
