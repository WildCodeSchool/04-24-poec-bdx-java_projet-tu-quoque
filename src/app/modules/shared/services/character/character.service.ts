import { DestroyRef, Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, map, of, switchMap, tap } from 'rxjs';
import { ConnectionService } from '../connection/connection.service';
import { ApiRessourceService } from '../api-ressource/api-ressource.service';
import { environment } from '../../../../../environments/environment.development';
import { UserInfos } from '../../models/types/users/user-infos';
import { CharacterFullDTO } from '../../models/types/users/character-full-dto';
import { Character } from '../../models/types/users/character.type';
import { CharacterDTO } from '../../models/types/users/character-dto';
import { CharacterAvatarDTO } from '../../models/types/users/character-avatar-DTO';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class CharacterService extends ApiRessourceService<Character> {

  private _userCharacterList$: BehaviorSubject<CharacterDTO[] | null> =
    new BehaviorSubject<CharacterDTO[] | null>(null);
  private _characterList: CharacterDTO[] = [];
  private _tableCharacterOnHoldList$: BehaviorSubject<CharacterAvatarDTO[]> =
    new BehaviorSubject<CharacterAvatarDTO[]>([]);
  private _characterOnHoldList: CharacterAvatarDTO[] = [];

  private _destroyRef: DestroyRef = inject(DestroyRef);
  private _connectionService = inject(ConnectionService);

  private readonly _BASE_URL: string = 'http://localhost:3000/characters';
  private readonly _BASE_URL_NEW: string = environment.baseUrl + '/characters';

  override getRessourceUrl(): string {
    return this._BASE_URL;
  }

  getUserCharacterById$(id: number): Observable<CharacterFullDTO>{
    const headers = this.getHeaders()
    return this._http.get<CharacterFullDTO>(this._BASE_URL_NEW + `/get/${id}`, { headers })
  }

  getCharacterWithoutTableListNew$(userId: number): Observable<CharacterDTO[]> {
    return this._http.get<CharacterDTO[]>(
      this._BASE_URL_NEW + `/get/character-available/userId=${userId}`
    );
  }

  getUserCharacterAvailableList$(): Observable<CharacterDTO[]> {
    return this._connectionService.getUserConnected$().pipe(
      switchMap((user: UserInfos | null) => {
        if (user == null) {
          return of([]);
        } else {
          return this.getCharacterWithoutTableListNew$(user.id);
        }
      })
    );
  }

  getCharacterAcceptedList$(tableId: number): Observable<CharacterDTO[]> {
    const headers = this.getHeaders();
    return this._http.get<CharacterDTO[]>(
      this._BASE_URL_NEW + `/get/character-accepted/tableId=${tableId}`
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

  postCharacter(userId: number, character: CharacterFullDTO): Observable<any> {
    const headers = this.getHeaders();
    return this._http.post(this._BASE_URL_NEW + `/add/${userId}`, character, {
      headers,
    });
  }

  getCharacterOnHoldList$(): Observable<CharacterAvatarDTO[]> {
    return this._tableCharacterOnHoldList$.asObservable();
  }

  setCharacterOnHoldList(tableId: number): void {
    this._http
      .get<CharacterAvatarDTO[]>(
        this._BASE_URL_NEW + `/get/character-on-hold/tableId=${tableId}`
      )
      .pipe(
        tap((characterOnHoldList: CharacterAvatarDTO[]) => {
          this._characterOnHoldList = characterOnHoldList;
          this._tableCharacterOnHoldList$.next(characterOnHoldList);
        })
      )
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe();
  }

  deleteCaharacterInvited(CharacterId: number): void {
    this._characterOnHoldList = this._characterOnHoldList.filter(
      (character: CharacterAvatarDTO) => character.id !== CharacterId
    );
    this._tableCharacterOnHoldList$.next(this._characterOnHoldList);
  }

  getCharacterList$(): Observable<CharacterDTO[] | null> {
    return this._userCharacterList$.asObservable();
  }

  setCharacterList(list: CharacterDTO[]): void {
    this._characterList = list;
    this._userCharacterList$.next(list);
  }

  acceptCharacter(characterId: number): Observable<CharacterFullDTO> {
    const acceptedValue = { accepted: true }
    const headers = this.getHeaders();
    return this._http.patch<CharacterFullDTO>(this._BASE_URL_NEW + `/patch/${characterId}`, acceptedValue, {headers})
    .pipe(
      tap(modifiedCharacter => {
        this._characterOnHoldList = this._characterOnHoldList.filter(
          (character: CharacterAvatarDTO) => character.id !== modifiedCharacter.id
        )
        this._tableCharacterOnHoldList$.next(this._characterOnHoldList);
      })
    )
  }

  deleteCharacter(characterId: number): void {
    const headers = this.getHeaders();
    this._characterList = this._characterList.filter(
      (character: CharacterDTO) => character.id !== characterId
    );
    this._userCharacterList$.next(this._characterList);
    // this._http
    //   .delete(this._BASE_URL_NEW + `/delete-item/${characterId}`, {headers})
    //   .subscribe();
  }
}
