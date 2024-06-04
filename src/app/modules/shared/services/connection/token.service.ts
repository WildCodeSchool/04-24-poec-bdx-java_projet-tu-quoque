import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode'; // A VOIR
import { BehaviorSubject, Observable } from 'rxjs';
import { LocalStorageService } from './local-storage.service';
import { TokenResponse } from '../../models/class/token.model';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private readonly _tokenDetailsSubject$: BehaviorSubject<any> = new BehaviorSubject<any>(this.getTokenFromLocalStorageAndDecode());
 
  constructor( private localStorageService: LocalStorageService) { }

  updateToken(tokenFromDB: TokenResponse) {
    this._clearLocalStorageAndThenPutNewToken(tokenFromDB);
    const decodedToken = this._decodeToken(tokenFromDB);
    this._setTokenDetailsSubject$(decodedToken);
  }

  getTokenFromLocalStorageAndDecode(): any {
    const tokenId = this.localStorageService.getToken();
    if(tokenId) {
      return this._decodeToken({token: tokenId});
    } else {
      return null;
    }
  }

  resetToken(): void {
    this._tokenDetailsSubject$.next({});
  }

  private _clearLocalStorageAndThenPutNewToken(TokenFromDB: TokenResponse): void {
    this.localStorageService.clearToken();
    this.localStorageService.setToken(TokenFromDB);
  }

  private _decodeToken(tokenFromDB: TokenResponse): any {
    return this._getDecodedTokenResponse(tokenFromDB.token)
  }

  private _getDecodedTokenResponse(token: string): any {
    return jwtDecode(token);
  }

  private _setTokenDetailsSubject$(tokenInfos: any): void {
    this._tokenDetailsSubject$.next(tokenInfos);
  }

  _getTokenDetailsSubject$(): Observable<any> {
    return this._tokenDetailsSubject$.asObservable();
  }
}
