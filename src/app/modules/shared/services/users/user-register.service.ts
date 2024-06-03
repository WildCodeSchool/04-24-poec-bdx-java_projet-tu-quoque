import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment.development';
import { Observable } from 'rxjs';
import { RegisterRequest } from '../../models/types/users/register-request';
import { RegisterResponse } from '../../models/types/users/register-response';

@Injectable({
  providedIn: 'root'
})
export class UserRegisterService {

  private readonly _BASE_URL: string = environment.baseUrl + environment.auth.register;
 
  constructor(private _http : HttpClient) { }

  registerUser(registerData: RegisterRequest): Observable<RegisterResponse> {
    return this._http.post<RegisterResponse>(this._BASE_URL, registerData);
  }
}
