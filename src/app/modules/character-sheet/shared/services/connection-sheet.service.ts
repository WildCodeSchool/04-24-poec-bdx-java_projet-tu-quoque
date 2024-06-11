import { inject, Injectable } from '@angular/core';
import { ApiRessourceService } from '../../../shared/services/api-ressource/api-ressource.service';
import { Sheet } from '../../models/types/sheet.type';
import { ConnectionService } from '../../../shared/services/connection/connection.service';
import { environment } from '../../../../../environments/environment.development';
import { Observable } from 'rxjs';
import { UserInfos } from '../../../shared/models/types/users/user-infos';

@Injectable({
  providedIn: 'root'
})
export class ConnectionSheetService extends ApiRessourceService<Sheet> {

  private _connectionService = inject(ConnectionService);

  private readonly _BASE_URL: string = environment.baseUrl + '/sheets';

  private readonly _userConnected$ =
    this._connectionService.getUserConnected$() as Observable<UserInfos>;

  override getRessourceUrl(): string {
    return this._BASE_URL;
  }
  // MODELE avec character
  //
  // getUserCharacterById$(id: number): Observable<CharacterFullDTO>{
  //   const headers = this.getHeaders()
  //   return this._http.get<CharacterFullDTO>(this._BASE_URL + `/get/${id}`, { headers })
  // }

  getSheetById$(id: number): Observable<any> {
    const headers = this.getHeaders()
    return this._http.get<any>(`${this._BASE_URL}/get/${id}`, { headers });
  }

}
