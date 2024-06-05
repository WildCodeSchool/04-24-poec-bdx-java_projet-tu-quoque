import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { environment } from '../../../../../environments/environment.development';
import { RegisterResponse } from '../../models/types/users/register-response';
import { UserRegister } from '../../models/class/user-register.model';
import { Observable, Subscription, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserRegisterService {

  private readonly _BASE_URL: string = environment.baseUrl + environment.auth.register;
  private subscription!: Subscription;

  constructor(private _http : HttpClient) { }

  registerUser(userRegister: UserRegister): Observable<RegisterResponse> {
    return this._http.post<RegisterResponse>(this._BASE_URL, userRegister)
  }
}
