import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { TableService } from '../table/table.service';
import { TableInvitation } from '../../models/types/users/table-invitation.type';
import { ConnectionService } from '../connection/connection.service';
import { ApiRessourceService } from '../api-ressource/api-ressource.service';
import { UserInfos } from '../../models/types/users/user-infos';
import { CharacterService } from '../character/character.service';
import { CharacterDTO } from '../../models/types/users/character-dto';
import { GameTableDTO } from '../../models/types/users/table-dto';
import { CharacterFullDTO } from '../../models/types/users/character-full-dto';
import { environment } from '../../../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class TableInvitationService extends ApiRessourceService<TableInvitation> {
  private readonly _BASE_URL = 'http://localhost:3000/user_table_invitations';
  private readonly _BASE_URL_CHARACTER: string =
    environment.baseUrl + '/characters';

  private _tableService = inject(TableService);
  private _connectionService = inject(ConnectionService);
  private _characterService = inject(CharacterService);

  private _userTableInvitationList$: BehaviorSubject<any> = new BehaviorSubject(
    []
  );
  private _tableInvitationList: GameTableDTO[] = [];
  private _playerCharactersWithoutTableList$: BehaviorSubject<CharacterDTO[]> =
    new BehaviorSubject<CharacterDTO[]>([]);
  private _characterWithoutTableList: CharacterDTO[] = [];

  override getRessourceUrl(): string {
    return this._BASE_URL;
  }

  setCharacterWithoutTableList$(): Observable<CharacterDTO[]> {
    return this._characterService.getUserCharacterAvailableList$().pipe(
      tap((response) => {
        this._playerCharactersWithoutTableList$.next(response);
        this._characterWithoutTableList = response;
      })
    );
  }

  setUserTableInvitationList$(): Observable<UserInfos | null> {
    return this._connectionService.getUserConnected$().pipe(
      tap((response: UserInfos | null) => {
        this._userTableInvitationList$.next(response?.gameTableInvitationList);
        this._tableInvitationList =
          response?.gameTableInvitationList as GameTableDTO[];
      })
    );
  }

  getCharacterWithoutTableList$(): Observable<CharacterDTO[]> {
    return this._playerCharactersWithoutTableList$;
  }

  getTableInvitationList$(): Observable<GameTableDTO[]> {
    return this._userTableInvitationList$;
  }

  updateCharacterTable(
    characterId: number,
    tableId: number
  ): Observable<CharacterFullDTO> {
    const headers = this.getHeaders();
    return this._http
      .post<CharacterFullDTO>(
        this._BASE_URL_CHARACTER +
          `/assign-table/characterId=${characterId}/tableId=${tableId}`,
        { headers }
      )
      .pipe(
        tap((updatedCharacter) => {
          this._characterWithoutTableList =
            this._characterWithoutTableList.filter(
              (character: CharacterDTO) => character.id !== updatedCharacter.id
            );
          this._playerCharactersWithoutTableList$.next(
            this._characterWithoutTableList
          );
        })
      );
  }
}
