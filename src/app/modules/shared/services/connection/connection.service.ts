import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { User } from '../../models/types/users/user.types';
import { Character } from '../../models/types/users/character.type';
import { Table } from '../../models/types/users/table.type';
import { HttpClient } from '@angular/common/http';
import { UserBasicInfos } from '../../models/types/users/user-basic-infos.type';

@Injectable({
  providedIn: 'root',
})
export class ConnectionService {

  fakeConnectedUser: UserBasicInfos = {
    id: 1,
    name: 'SkyWalker22',
    avatar: '/assets/images/user-profile-images/user1.jpg',
    role: 'user',
  };

  fakeConnectedCharacter: Character = {
    id: 1,
    name: 'Elric',
    avatar: '/assets/images/profile-img-test.jpg',
    userId: 1,
    tableId: 4,
    characterSheetId: 1,
    accepted: false,
    scheduleId: 1,
  };

  fakeConnectedTable: Table = {
    id: 5,
    avatar: '',
    name: 'Les ajustables',
    userId: 1,
  };

  private _user$: BehaviorSubject<UserBasicInfos | null> =
    new BehaviorSubject<UserBasicInfos | null>(this.fakeConnectedUser);
  private _character$: BehaviorSubject<Character | null> =
    new BehaviorSubject<Character | null>(null);
  private _table$: BehaviorSubject<Table | null> =
    new BehaviorSubject<Table | null>(this.fakeConnectedTable);

  constructor(protected _http: HttpClient) {}

  getUserConected$(): Observable<UserBasicInfos | null> {
    return this._user$.asObservable();
  }

  getCharacterConnected$(): Observable<Character | null> {
    return this._character$.asObservable();
  }

  getTableConnected$(): Observable<Table | null> {
    return this._table$.asObservable();
  }

  setUserConnected(value: User): void {
    this._user$.next(value);
  }

  setCharacterConnected(value: Character): void {
    this._character$.next(value);
  }

  setTableConnected(value: Table): void {
    this._table$.next(value);
  }
}
