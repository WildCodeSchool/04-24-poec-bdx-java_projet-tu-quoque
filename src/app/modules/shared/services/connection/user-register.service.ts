import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { environment } from '../../../../../environments/environment.development';
import { RegisterResponse } from '../../models/types/users/register-response';
import { UserRegister } from '../../models/class/user-register.model';
import { Subscription, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserRegisterService implements OnDestroy{

  private readonly _BASE_URL: string = environment.baseUrl + environment.auth.register;
  private subscription!: Subscription;

  constructor(private _http : HttpClient) { }

  registerUser(userRegister: UserRegister): void {
    this.subscription = this._http.post<RegisterResponse>(this._BASE_URL, userRegister)
    .pipe(tap(res => console.log(res)))
    .subscribe()
  }

  ngOnDestroy(): void {
    if(this.subscription) {
      this.subscription.unsubscribe();
    }
}
}
