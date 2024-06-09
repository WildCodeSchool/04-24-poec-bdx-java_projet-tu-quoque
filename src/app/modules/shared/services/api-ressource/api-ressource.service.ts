import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ElementProperties } from '../../../character-sheet/models/interfaces/element-properties';

@Injectable({
  providedIn: 'root'
})
export abstract class ApiRessourceService<T extends ElementProperties> {

  protected _http = inject(HttpClient);

  abstract getRessourceUrl(): string;

  getAll$(): Observable<T[]> {
    return this._http.get<T[]>(this.getRessourceUrl())
  }

  // proposition :
  // getById$(id: number): Observable<T> {
  //   return this._http.get<T>(`${this.getRessourceUrl()}/${id}`);
  // }

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
