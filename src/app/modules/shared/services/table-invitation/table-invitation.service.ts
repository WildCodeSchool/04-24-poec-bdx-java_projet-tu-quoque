import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, map, switchMap } from 'rxjs';
import { TableService } from '../table/table.service';
import { TableInvitation } from '../../models/types/users/table-invitation.type';
import { Table } from '../../models/types/users/table.type';
import { ConnectionService } from '../connection/connection.service';
import { UserBasicInfos } from '../../models/types/users/user-basic-infos.type';
import { ApiRessourceService } from '../api-ressource/api-ressource.service';

@Injectable({
  providedIn: 'root',
})
export class TableInvitationService extends ApiRessourceService<TableInvitation> {
  
  private _tableService = inject(TableService);

  private _connectionService = inject(ConnectionService);

  private _userConnected$ =
    this._connectionService.getUserConected$() as Observable<UserBasicInfos>;

  private readonly _BASE_URL = 'http://localhost:3000/user_table_invitations';

  private _userTableInvitationList$: BehaviorSubject<any> = new BehaviorSubject(
    []
  );

  override getRessourceUrl(): string {
    return this._BASE_URL;
  }

  getTableInvitationListByUser$(): Observable<number[]> {
    return this.getAll$().pipe(
      switchMap((tableInvitationList: TableInvitation[]) =>
        this._userConnected$.pipe(
          map((user: UserBasicInfos) =>
            tableInvitationList.filter(
              (tableInvitation: TableInvitation) =>
                tableInvitation.userId === user.id
            )
          )
        )
      ),
      map((invitationArray: TableInvitation[]) =>
        invitationArray.map((invit: TableInvitation) => invit.tableId)
      )
    );
  }

  getTableInvitationListNames$(): Observable<Table[]> {
    return this.getTableInvitationListByUser$().pipe(
      switchMap((tableIdList: number[]) =>
        this._tableService
          .getAll$()
          .pipe(
            map((tableList: Table[]) =>
              tableList.filter((table: Table) =>
                tableIdList.includes(Number(table.id))
              )
            )
          )
      )
    );
  }

  getUserTableInvitationList$(): Observable<TableInvitation[]> {
    return this._userTableInvitationList$.value.length
      ? this._userTableInvitationList$.asObservable()
      : this.getTableInvitationListNames$();
  }
}
