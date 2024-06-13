import { Injectable, inject } from '@angular/core';
import { Observable, map, of, switchMap } from 'rxjs';
import { ConnectionService } from '../connection/connection.service';
import { ApiRessourceService } from '../api-ressource/api-ressource.service';
import { environment } from '../../../../../environments/environment.development';
import { UserInfos } from '../../models/types/users/user-infos';
import { CharacterFullDTO } from '../../models/types/users/character-full-dto';
import { Character } from '../../models/types/users/character.type';
import { CharacterDTO } from '../../models/types/users/character-dto';

@Injectable({
  providedIn: 'root',
})
export class CharacterService extends ApiRessourceService<Character> {

  private _connectionService = inject(ConnectionService);

  private readonly _BASE_URL: string = 'http://localhost:3000/characters';
  private readonly _BASE_URL_NEW: string = environment.baseUrl + '/characters';

  private readonly _userConnected$ =
    this._connectionService.getUserConnected$() as Observable<UserInfos>;

  override getRessourceUrl(): string {
    return this._BASE_URL;
  }

  getUserCharacterById$(id: number): Observable<CharacterFullDTO>{
    const headers = this.getHeaders()
    return this._http.get<CharacterFullDTO>(this._BASE_URL_NEW + `/get/${id}`, { headers })
  }
   
  getCharacterWithoutTableListNew$(id: number): Observable<CharacterDTO[]> {
    return this._http.get<CharacterDTO[]>(this._BASE_URL_NEW + `/get/character-available/userId=${id}`)
  }

  getUserCharacterAvailableList$(): Observable<CharacterDTO[]> {
    return this._connectionService.getUserConnected$().pipe(
      switchMap((user: UserInfos | null) => {
        if(user == null) {
          return of([])
        } else {
          return this.getCharacterWithoutTableListNew$(user.id);
        }
      }
    )
  )
  }

  getCharacterAcceptedList$(tableId: number): Observable<CharacterDTO[]> {
    const headers = this.getHeaders()
    return this._http.get<CharacterDTO[]>(this._BASE_URL_NEW + `/get/character-accepted/tableId=${tableId}`)
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

  postCharacter(userId: number, character: CharacterFullDTO): Observable<any>{
    const headers = this.getHeaders(); 
    return this._http.post(this._BASE_URL_NEW + `/add/${userId}`, character, { headers })
  }
}
