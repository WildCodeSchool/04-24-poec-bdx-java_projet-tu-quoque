import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Users } from '../../models/types/users/users.types';
import { usersApiResponse } from '../../models/types/users/users-api-response.type';
import { PersonalInfos } from '../../models/types/users/personalInfos.type';

@Injectable({
  providedIn: 'root'
})
export class GetUserService {

  private readonly _BASE_URL = 'assets/json/users.json';

  constructor(private _http: HttpClient) { }

  getUsers$(): Observable<PersonalInfos[]> {
    return this._http.get<usersApiResponse>(this._BASE_URL)
    .pipe(
      map((response: usersApiResponse) => {
        return response.users.flatMap(user => user.personalInfos); // j'utilise flatMap pour "aplatir" tous les tableaux personalInfo en un seul tableau. Cela fait que getUsers$() renvoie un tableau de tous les PersonalInfos de tous les utilisateurs.
      })
    );
}
}
