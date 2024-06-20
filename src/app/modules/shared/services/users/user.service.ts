import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, map, of, tap } from 'rxjs';
import { User } from '../../models/types/users/user.types';
import { ApiRessourceService } from '../api-ressource/api-ressource.service';
import { UserBasicInfos } from '../../models/types/users/user-basic-infos.type';
import { environment } from '../../../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class userService extends ApiRessourceService<User> {
  private readonly _BASE_URL: string = 'http://localhost:3000/users';
  private readonly _BASE_URL_NEW: string = environment.baseUrl + '/users'

  private userListFilteredByName$: Subject<string[]> = new Subject();
  private _tableUserInvitedList$: BehaviorSubject<UserBasicInfos[]> = new BehaviorSubject<UserBasicInfos[]>([])
  private _userInvitedList: UserBasicInfos[] = [];

  override getRessourceUrl(): string {
    return this._BASE_URL;
  }

  getUserByName$(letters: string): Observable<string[]> {
    return this.getAll$().pipe(
      map((userList: User[]) => userList.map((user: User) => user.name)),
      map((result: string[]) =>
        result.filter((user: string) =>
          user.toLowerCase().startsWith(letters.toLowerCase())
        )
      ),
      tap((result: string[]) => this.userListFilteredByName$.next(result))
    );
  }

  getUserByEmail$(email: string): Observable<User[]> {
    return this.getAll$().pipe(
      map((userList: User[]) =>
        userList.filter((user: User) => user.email === email)
      )
    );
  }

  getUserListFilteredByName$(): Observable<string[]> {
    return this.userListFilteredByName$.asObservable();
  }

  setTableUserInvited(tableId: number): void {
    this._http.get<UserBasicInfos[]>(
      this._BASE_URL_NEW + `/get/user-invited/tableId=${tableId}`
    ).pipe(
      tap((userInvitedList: UserBasicInfos[]) => {
        this._userInvitedList = userInvitedList;
        this._tableUserInvitedList$.next(userInvitedList);
      })
    ).subscribe();
  } 

  getTableUserInvited$(): Observable<UserBasicInfos[]> {
    return this._tableUserInvitedList$.asObservable()
  }
}
