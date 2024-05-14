import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject, map, switchMap, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class userService {

  // using JSON server
  private readonly _BASE_URL: string = "http://localhost:3000/users"

  // private _BASE_URL: string = "/assets/json/users.json" 

  constructor(private _http: HttpClient, private router: Router) { }

  userListFilteredByName$: Subject<any> = new Subject()
  userListFilteredByEmail$: Subject<any> = new Subject()

  getUserList$(): Observable<any> {
    return this._http.get(this._BASE_URL)
  }

  getUserByName$(letters: string): Observable<any> {
    return this._http.get(this._BASE_URL)
    .pipe(
      map((userList: any) => userList.map((user: any) => user.name)),
      map(result => 
        result.filter((user: any) => 
          user.toLowerCase().startsWith(letters.toLowerCase())),
      ),
      tap(result => this.userListFilteredByName$.next(result))
    )
  }

  getUserByEmail$(email: string): Observable<any> {
    return this.getUserList$()
      .pipe(
        map((userList: any) => userList.filter((user: any) => user.email === email)),
      );
  }

  getUserListFilteredByName$(): Observable<any> {
    return this.userListFilteredByName$.asObservable()
  }

  checkUserInfos(email: string, password: string): Observable<any> { {
    return this.getUserByEmail$(email)
    .pipe(
      map(response => 
        {
          if(response.length){
            if(response[0].password === password){
              return(true)
            } else {
              return (false)
            }
          } else {
            return (false)
          }
        }
      ),
    )
  }
  } 
}
