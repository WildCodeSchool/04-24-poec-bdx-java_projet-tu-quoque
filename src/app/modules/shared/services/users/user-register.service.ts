import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UserRegisterService {

  private readonly _BASE_URL: string = environment.baseUrl + environment.auth.register;
 
  constructor(private _http : HttpClient) { }
}
