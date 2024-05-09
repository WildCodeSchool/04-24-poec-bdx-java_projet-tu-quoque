import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Users } from '../../models/types/users/users.types';
import { usersApiResponse } from '../../models/types/users/users-api-response.type';


@Injectable({
  providedIn: 'root'
})
export class GetUsersService {

  private readonly _BASE_URL = 'assets/json/users.json';

  constructor(private _http: HttpClient) { }

  getUsers$(): Observable<Users[]> {
    return this._http.get<usersApiResponse>(this._BASE_URL)
    .pipe(
      map((response: usersApiResponse) => { 
        return response.users;
      })
    );
}
}
