import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, switchMap } from 'rxjs';
import { Table } from '../../models/types/users/table.type';
import { ConnectionService } from '../connection/connection.service';
import { UserBasicInfos } from '../../models/types/users/userBasicInfos.type';
import { ApiRessourceService } from '../api-ressource/api-ressource.service';

@Injectable({
  providedIn: 'root',
})
export class TableService extends ApiRessourceService<Table> {

  private readonly _BASE_URL: string = 'http://localhost:3000/tables';
  private readonly _userConnected$ = this._connectionService.getUserConected$();

  constructor(
    protected override _http: HttpClient,
    private _connectionService: ConnectionService
  ) {
    super(_http);
  }

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
