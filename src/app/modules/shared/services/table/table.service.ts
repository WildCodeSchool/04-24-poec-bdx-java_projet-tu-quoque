import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TableService {

  constructor(private _http: HttpClient) { }

  getUserTableList(): Observable<any> {
    return this._http.get('assets/json/tables.json')
    .pipe(
      map((response: any) => response.tables)
    )
  }
}
