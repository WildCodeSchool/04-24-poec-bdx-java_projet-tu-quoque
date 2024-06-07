import { Injectable } from '@angular/core';
import { TokenResponse } from '../../models/class/token.model';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  getToken(): string | null {
    const tokenId = localStorage.getItem("tokenId");
    if (tokenId) {
      return tokenId;
    } else {
      return null;
    }
  }

  setToken(tokenFromDB: TokenResponse): void {
    localStorage.setItem("tokenId", tokenFromDB.token);
  }

  clearToken(): void {
    localStorage.removeItem("tokenId");
  }
}
