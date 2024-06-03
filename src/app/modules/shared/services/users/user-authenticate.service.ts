import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserAuthenticateService {

  private readonly _BASE_URL: string = environment.baseUrl + environment.auth.authenticate;
 
  constructor(private _http : HttpClient) { }

  authenticateUser(email: string, password: string): Observable<any> {
    const body = { email, password };
    return this._http.post<any>(this._BASE_URL, body).pipe(
      map(response => {
        localStorage.setItem('user', JSON.stringify(response));
        return response;
      })
    );
  }

}
