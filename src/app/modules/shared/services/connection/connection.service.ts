import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, filter, tap } from 'rxjs';
import { User } from '../../models/types/users/user.types';
import { Character } from '../../models/types/users/character.type';
import { Table } from '../../models/types/users/table.type';
import { HttpClient } from '@angular/common/http';
import { UserBasicInfos } from '../../models/types/users/user-basic-infos.type';
import { environment } from '../../../../../environments/environment.development';
import { UserInfos } from '../../models/types/users/user-infos';

@Injectable({
  providedIn: 'root',
})
export class ConnectionService {
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
    id: 3,
    avatar:
      '/assets/images/table-profile-images/le-donjon-des-monts-venteux.jpg',
    name: 'le donjon des monts venteux',
    userId: 1,
  };

  private readonly _BASE_URL: string = environment.baseUrl + environment.users.personal;
  private _user$: BehaviorSubject<UserInfos | null> = 
  new BehaviorSubject<UserInfos | null>(null);
  private _character$: BehaviorSubject<Character | null> =
    new BehaviorSubject<Character | null>(null);
  private _table$: BehaviorSubject<Table | null> =
    new BehaviorSubject<Table | null>(this.fakeConnectedTable);

  constructor(protected _http: HttpClient) {}


  // Méthode pour récupérer les informations de l'utilisateur connecté
  personalInfo(): Observable<UserInfos | null> {
    return this._http.get<UserInfos>(this._BASE_URL).pipe(
      tap(user => this._user$.next(user))
    );
  }

  // Méthode pour obtenir un Observable des informations de l'utilisateur connecté
  getUserConnected$(): Observable<UserInfos | null> {
    return this._user$.asObservable();
  }

  // Méthode pour définir les informations de l'utilisateur connecté
  setUserConnected(value: UserInfos): void {
    this._user$.next(value);
  }

  // Méthode pour obtenir un Observable des informations du personnage connecté
  getCharacterConnected$(): Observable<Character | null> {
    return this._character$.asObservable();
  }

  // Méthode pour définir les informations du personnage connecté
  setCharacterConnected(value: Character): void {
    this._character$.next(value);
  }

  // Méthode pour obtenir un Observable des informations de la table de jeu connectée
  getTableConnected$(): Observable<Table | null> {
    return this._table$.asObservable();
  }

  // Méthode pour définir les informations de la table de jeu connectée
  setTableConnected(value: Table): void {
    this._table$.next(value);
  }
}
