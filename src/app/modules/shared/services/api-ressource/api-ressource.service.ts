import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ElementProperties } from '../../../character-sheet/models/interfaces/element-properties';

@Injectable({
  providedIn: 'root'
})
export abstract class ApiRessourceService<T extends ElementProperties> {

  constructor(protected _http: HttpClient) { }

  abstract getRessourceUrl(): string;

  getAll$(): Observable<T[]> {
    return this._http.get<T[]>(this.getRessourceUrl())
  }

  getById$(id: number): Observable<T> {
    return this.getAll$().pipe(
      map(
        (response: T[]) =>
          response.find(
            (element: T) => Number(element.id) === Number(id)
          ) as T
      )
    );
  }
}
