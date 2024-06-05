import { Injectable, OnDestroy } from '@angular/core';
import { environment } from '../../../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { AuthResponse } from '../../models/types/users/auth-response';
import { UserAuth } from '../../models/class/user-auth.model';
import { TokenService } from './token.service';
import { TokenResponse } from '../../models/class/token.model';
import { Observable, Subscription, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserAuthenticateService {

  private readonly _BASE_URL: string = environment.baseUrl + environment.auth.authenticate;

  constructor(
    private _http : HttpClient,
    private tokenService: TokenService
  ) { }

  authenticateUser(userAuth: UserAuth): Observable<TokenResponse> {
    this.tokenService.resetToken();
    return this._http.post<AuthResponse>(this._BASE_URL, userAuth).pipe(
      map((tokenFromDB: TokenResponse) => {
        this.tokenService.updateToken(tokenFromDB);
        return tokenFromDB;
      })
    );
  }
}
