import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { AuthResponse } from '../../models/types/users/auth-response';
import { AuthRequest } from '../../models/types/users/auth-request';

@Injectable({
  providedIn: 'root'
})
export class UserAuthenticateService {

  private readonly _BASE_URL: string = environment.baseUrl + environment.auth.authenticate;
 
  constructor(private _http : HttpClient) { }

  authenticateUser(email: string, password: string): Observable<AuthResponse> {
    const body: AuthRequest = { email, password };
    return this._http.post<AuthResponse>(this._BASE_URL, body).pipe(
      map(response => {
        localStorage.setItem('user', JSON.stringify(response));
        return response;
      })
    );
  }

}
