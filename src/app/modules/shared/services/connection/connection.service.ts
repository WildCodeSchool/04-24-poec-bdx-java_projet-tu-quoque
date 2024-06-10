import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment.development';
import { UserInfos } from '../../models/types/users/user-infos';
import { GameTableFullDTO } from '../../models/types/users/table-full-dto';
import { CharacterFullDTO } from '../../models/types/users/character-full-dto';

@Injectable({
  providedIn: 'root',
})
export class ConnectionService {

  private readonly _BASE_URL: string =
    environment.baseUrl + environment.users.personal;

  private _user$: BehaviorSubject<UserInfos | null> =
    new BehaviorSubject<UserInfos | null>(null);
  private _tableNew$: BehaviorSubject<GameTableFullDTO | null> =
    new BehaviorSubject<GameTableFullDTO | null>(null);
  private _characterNew$: BehaviorSubject<CharacterFullDTO | null> =
  new BehaviorSubject<CharacterFullDTO | null>(null);

  constructor(protected _http: HttpClient) {}

  personalInfo(): Observable<UserInfos | null> {
    return this._http
      .get<UserInfos>(this._BASE_URL)
      .pipe(tap((user) => this._user$.next(user)));
  }

  getUserConnected$(): Observable<UserInfos | null> {
    if (!this._user$) {
      this.personalInfo();
    }
    return this._user$.asObservable();
  }

  setUserConnected(value: UserInfos | null): void {
    this._user$.next(value);
  }

  getTableConnectedNew$(): Observable<GameTableFullDTO | null> {
    return this._tableNew$.asObservable();
  }

  setTableConnectedNew(value: GameTableFullDTO | null): void {
    this._tableNew$.next(value);
  }

  getCharacterConnectedNew$(): Observable<CharacterFullDTO | null> {
    return this._characterNew$.asObservable();
  }

  setCharacterConnectedNew(value: CharacterFullDTO | null): void {
    this._characterNew$.next(value);
  }


}
