import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Table } from '../../models/types/users/table.type';
import { ApiRessourceService } from '../api-ressource/api-ressource.service';
import { environment } from '../../../../../environments/environment.development';
import { CharacterDTO } from '../../models/types/users/character-dto';
import { GameTableFullDTO } from '../../models/types/users/table-full-dto';
import { GameTableDTO } from '../../models/types/users/table-dto';

@Injectable({
  providedIn: 'root',
})
export class TableService extends ApiRessourceService<Table> {

  private _userTableList$: BehaviorSubject<GameTableDTO[] | null> =
  new BehaviorSubject<GameTableDTO[] | null>(null);
  private _tableList: GameTableDTO[] = [];

  private readonly _BASE_URL: string = environment.baseUrl + '/tables';

  override getRessourceUrl(): string {
    return this._BASE_URL;
  }

  getUserTableByIdNew$(id: number): Observable<GameTableFullDTO> {
    const headers = this.getHeaders()
    return this._http.get<GameTableFullDTO>(this._BASE_URL + `/get/${id}`, { headers });
  }

  postTable(userId: number, table: GameTableFullDTO): Observable<any>{
    const headers = this.getHeaders(); 
    return this._http.post<GameTableFullDTO>(this._BASE_URL + `/add/${userId}`, table, { headers });
  }

  getTableList$(): Observable<GameTableDTO[] | null> {
    return this._userTableList$.asObservable();
  }

  setTableList(list: GameTableDTO[]): void {
    this._tableList = list;
    this._userTableList$.next(list);
  }

  deleteTable(tableId: number): void {
    const headers = this.getHeaders();
    this._tableList = this._tableList.filter(
      (table: GameTableDTO) => table.id !== tableId
    );
    console.log(this._tableList)
    this._userTableList$.next(this._tableList);
    // this._http
    //   .delete(this._BASE_URL + `/delete/${tableId}`, {headers})
    //   .subscribe();
  }
}
