import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject, map, tap } from 'rxjs';
import { User } from '../../models/types/users/user.types';

@Injectable({
  providedIn: 'root',
})
export class userService {

  private readonly _BASE_URL: string = 'http://localhost:3000/users';

  constructor(private _http: HttpClient, private router: Router) {}

  private userListFilteredByName$: Subject<string[]> = new Subject();

  getUserList$(): Observable<User[]> {
    return this._http.get<User[]>(this._BASE_URL);
  }

  getUserByName$(letters: string): Observable<string[]> {
    return this.getUserList$().pipe(
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
    return this.getUserList$().pipe(
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
