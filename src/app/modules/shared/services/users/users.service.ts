import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private _BASE_URL: string = "/assets/json/users.json" 
  constructor(private _http: HttpClient) { }
}
