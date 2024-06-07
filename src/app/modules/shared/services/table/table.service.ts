import { Injectable, inject } from '@angular/core';
import { Observable, map, switchMap } from 'rxjs';
import { Table } from '../../models/types/users/table.type';
import { ConnectionService } from '../connection/connection.service';
import { UserBasicInfos } from '../../models/types/users/user-basic-infos.type';
import { ApiRessourceService } from '../api-ressource/api-ressource.service';
import { UserInfos } from '../../models/types/users/user-infos';

@Injectable({
  providedIn: 'root',
})
export class TableService extends ApiRessourceService<Table> {
  
  private _connectionService = inject(ConnectionService);

  private readonly _BASE_URL: string = 'http://localhost:3000/tables';

  private readonly _userConnected$ =
    this._connectionService.getUserConnected$() as Observable<UserInfos>;

  override getRessourceUrl(): string {
    return this._BASE_URL;
  }

  getUserTableList$(): Observable<Table[]> {
    return this.getAll$().pipe(
      switchMap((tableList: Table[]) =>
        this._userConnected$.pipe(
          map((user: UserInfos) =>
            tableList.filter((table: Table) => table.userId === user.id)
          )
        )
      )
    );
  }
}
