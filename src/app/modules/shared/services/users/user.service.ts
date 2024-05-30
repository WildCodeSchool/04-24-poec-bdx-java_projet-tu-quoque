import { Injectable } from '@angular/core';
import { Observable, Subject, map, tap } from 'rxjs';
import { User } from '../../models/types/users/user.types';
import { ApiRessourceService } from '../api-ressource/api-ressource.service';

@Injectable({
  providedIn: 'root',
})
export class userService extends ApiRessourceService<User> {

  private readonly _BASE_URL: string = 'http://localhost:3000/users';
  
  private userListFilteredByName$: Subject<string[]> = new Subject();

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

  checkUserInfos(email: string, password: string): Observable<Boolean> {
    {
      return this.getUserByEmail$(email).pipe(
        map((response: User[]) => {
          if (response.length) {
            if (response[0].password === password) {
              return true;
            } else {
              return false;
            }
          } else {
            return false;
          }
        })
      );
    }
  }
}
