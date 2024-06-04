import { Injectable, OnDestroy } from '@angular/core';
import { environment } from '../../../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { AuthResponse } from '../../models/types/users/auth-response';
import { UserAuth } from '../../models/class/user-auth.model';
import { TokenService } from './token.service';
import { TokenResponse } from '../../models/class/token.model';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserAuthenticateService implements OnDestroy{

  private readonly _BASE_URL: string = environment.baseUrl + environment.auth.authenticate;
  private subscription!: Subscription;

  constructor(
    private _http : HttpClient,
    private tokenService: TokenService
  ) { }

  authenticateUser(userAuth: UserAuth): void {
    this.tokenService.resetToken();
    this.subscription = this._http.post<AuthResponse>(this._BASE_URL, userAuth)
      .subscribe((tokenFromDB: TokenResponse) => {
        this.tokenService.updateToken(tokenFromDB);
      })
  }

  ngOnDestroy(): void {
      if(this.subscription) {
        this.subscription.unsubscribe();
      }
  }
}
