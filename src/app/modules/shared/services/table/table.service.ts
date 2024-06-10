import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Table } from '../../models/types/users/table.type';
import { ApiRessourceService } from '../api-ressource/api-ressource.service';
import { environment } from '../../../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class TableService extends ApiRessourceService<Table> {

  private readonly _BASE_URL: string = environment.baseUrl + '/tables';

  override getRessourceUrl(): string {
    return this._BASE_URL;
  }

  getUserTableByIdNew(id: number): Observable<any> {
    const headers = this.getHeaders()
    return this._http.get(this._BASE_URL + `/get/${id}`, { headers });
  }

  // proposition : 
  // getUserTableByIdNew(id: number): Observable<GameTableFullDTO> {
  //   const token = this._localStorageService.getToken();
  //   const headers = new HttpHeaders({
  //     Authorization: `Bearer ${token}`,
  //   });
  //   return this._http.get<GameTableFullDTO>(this._BASE_URL + `/get/${id}`, { headers });
  // }
}
