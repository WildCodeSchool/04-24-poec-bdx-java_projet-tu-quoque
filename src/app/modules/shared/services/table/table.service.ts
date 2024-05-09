import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TableService {

  private _BASE_URL: string = 'assets/json/tables.json'

  constructor(private _http: HttpClient) { }

  getUserTableList(): Observable<any> {
    return this._http.get(this._BASE_URL)
    .pipe(
      map((response: any) => response.tables)
    )
  }

  getTableById(id: Number): Observable<any> {
    return this.getUserTableList()
    .pipe(
      map((response: any) => response.find((table: any) => table.id === id))
    )
  }
}
