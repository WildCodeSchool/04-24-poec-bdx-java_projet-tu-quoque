import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { TableService } from '../table/table.service';
import { TableInvitation } from '../../models/types/users/table-invitation.type';
import { ConnectionService } from '../connection/connection.service';
import { ApiRessourceService } from '../api-ressource/api-ressource.service';
import { UserInfos } from '../../models/types/users/user-infos';

@Injectable({
  providedIn: 'root',
})
export class TableInvitationService extends ApiRessourceService<TableInvitation> {
  
  private _tableService = inject(TableService);

  private _connectionService = inject(ConnectionService);

  private _userConnected$ =
    this._connectionService.getUserConnected$() as Observable<UserInfos>;

  private readonly _BASE_URL = 'http://localhost:3000/user_table_invitations';

  private _userTableInvitationList$: BehaviorSubject<any> = new BehaviorSubject(
    []
  );

  override getRessourceUrl(): string {
    return this._BASE_URL;
  }
}
