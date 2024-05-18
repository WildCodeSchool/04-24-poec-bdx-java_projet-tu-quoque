import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, switchMap, tap } from 'rxjs';
import { Table } from '../../models/types/users/table.type';
import { ConnectionService } from '../connection/connection.service';
import { UserBasicInfos } from '../../models/types/users/userBasicInfos.type';

@Injectable({
  providedIn: 'root',
})
export class TableService {

  private readonly _BASE_URL: string = 'http://localhost:3000/tables';
  private readonly _userConnected$ = this._connectionService.getUserConected$();

  constructor(
    private _http: HttpClient,
    private _connectionService: ConnectionService
  ) {}

  getTableList$(): Observable<Table[]> {

    return this._http.get<Table[]>(this._BASE_URL);
  }

  getUserTableList$(): Observable<Table[]> {
    return this.getTableList$().pipe(
      switchMap((tableList: Table[]) =>
        this._userConnected$.pipe(
          map((user: UserBasicInfos) =>
            tableList.filter((table: Table) => table.userId === user.id)
          )
        )
      )
    );
  }

  getTableById$(id: Number): Observable<Table> {
    return this.getTableList$().pipe(
      map(
        (response: Table[]) =>
          response.find(
            (table: Table) => Number(table.id) === Number(id)
          ) as Table
      )
    );
  }
}
