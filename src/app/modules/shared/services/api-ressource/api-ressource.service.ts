import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ElementProperties } from '../../../character-sheet/models/interfaces/element-properties';
import { LocalStorageService } from '../connection/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export abstract class ApiRessourceService<T extends ElementProperties> {

  protected _http = inject(HttpClient);
  private _localStorageService = inject(LocalStorageService)

  abstract getRessourceUrl(): string;

  getAll$(): Observable<T[]> {
    return this._http.get<T[]>(this.getRessourceUrl())
  }

  getHeaders(): HttpHeaders {
    const token = this._localStorageService.getToken();
    return new HttpHeaders({
      "Authorization": `Bearer ${token}`
    });
  };
  
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
