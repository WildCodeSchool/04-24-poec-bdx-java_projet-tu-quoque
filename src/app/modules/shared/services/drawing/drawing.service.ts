import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Drawing } from '../../models/types/users/drawing.type';

@Injectable({
  providedIn: 'root'
})
export class DrawingService {

  private readonly _BASE_URL: string = "http://localhost:3000/drawings"

  constructor(private _http: HttpClient) { }

  getDrawingList(): Observable<Drawing[]> {
    return this._http.get<any>(this._BASE_URL)
  }

  getDrawingListByTable(tableId: number): Observable<Drawing[]> {
    return this.getDrawingList()
    .pipe(
      map((result: Drawing[]) => result.filter((drawing: Drawing) => Number(drawing.table_id) === tableId))
    )
  }
}
