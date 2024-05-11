import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import { Table } from '../../models/types/users/table.type';

@Injectable({
  providedIn: 'root'
})
export class TableService {

  // private _BASE_URL: string = 'assets/json/tables.json'

  private readonly _BASE_URL: string = "http://localhost:3000/tables"

  private readonly _USER_CONECTED = 1


  constructor(private _http: HttpClient) { }

  getUserTableList$(): Observable<Table[]> {
    return this._http.get(this._BASE_URL)
    .pipe(
      map((response: any) => 
        response.filter((response: Table) => response.user_id === this._USER_CONECTED)
    )
    )
  }

  getTableById$(id: Number): Observable<Table> {
    return this.getUserTableList$()
    .pipe(
      //tap(res => console.log(res)), POURQUOI L4ID EST EN FORMAT STRING ???
      map((response: Table[]) => response.find((table: Table) => Number(table.id) === id) as Table)
    )
  }
}
