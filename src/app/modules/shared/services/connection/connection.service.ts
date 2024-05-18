import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { User } from '../../models/types/users/user.types';
import { Character } from '../../models/types/users/character.type';
import { Table } from '../../models/types/users/table.type';
import { HttpClient } from '@angular/common/http';
import { UserBasicInfos } from '../../models/types/users/userBasicInfos.type';

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

  noCharacterConnected: Character = {
    id: 666,
    name: 'NoCharacter',
    avatar: '',
    userId: 666,
    accepted: false,
    scheduleId: 666,
  };

  noTableConnected: Table = {
    id: 666,
    avatar: '',
    name: 'NoTable',
    userId: 666,
  };

  private _user$: BehaviorSubject<UserBasicInfos> = new BehaviorSubject(
    this.fakeConnectedUser
  );
  private _character$: BehaviorSubject<Character> = new BehaviorSubject(
    this.noCharacterConnected
  );
  private _table$: BehaviorSubject<Table> = new BehaviorSubject(
    this.fakeConnectedTable
  );

  constructor(protected _http: HttpClient) {}

  getUserConected$(): Observable<UserBasicInfos> {
    return this._user$.asObservable();
  }

  getCharacterConnected$(): Observable<Character> {
    return this._character$.asObservable();
  }

  getTableConnected$(): Observable<Table> {
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
