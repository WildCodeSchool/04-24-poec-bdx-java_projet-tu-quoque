import { Injectable, inject } from '@angular/core';
import { Observable, map, switchMap } from 'rxjs';
import { Table } from '../../models/types/users/table.type';
import { ConnectionService } from '../connection/connection.service';
import { UserBasicInfos } from '../../models/types/users/userBasicInfos.type';
import { ApiRessourceService } from '../api-ressource/api-ressource.service';

@Injectable({
  providedIn: 'root',
})
export class TableService extends ApiRessourceService<Table> {
  
  private _connectionService = inject(ConnectionService);

  private readonly _BASE_URL: string = 'http://localhost:3000/tables';

  private readonly _userConnected$ =
    this._connectionService.getUserConected$() as Observable<UserBasicInfos>;

  override getRessourceUrl(): string {
    return this._BASE_URL;
  }

  getUserTableList$(): Observable<Table[]> {
    return this.getAll$().pipe(
      switchMap((tableList: Table[]) =>
        this._userConnected$.pipe(
          map((user: UserBasicInfos) =>
            tableList.filter((table: Table) => table.userId === user.id)
          )
        )
      )
    );
  }
}
