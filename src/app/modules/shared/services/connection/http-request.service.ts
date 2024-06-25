import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpRequestService {

  private _httpErrorSubject$: BehaviorSubject<HttpErrorResponse> = new BehaviorSubject(new HttpErrorResponse({}));
  private _httpSuccessSubject$: BehaviorSubject<HttpResponse<any>> = new BehaviorSubject(new HttpResponse({}));

  constructor(
    private http: HttpClient
  ) { }

  getHttpErrorSubject$(): Observable<HttpErrorResponse> {
    return this._httpErrorSubject$.asObservable();
  }

  setHttpErrorSubject$(error: HttpErrorResponse): void{
    this._httpSuccessSubject$.next(new HttpResponse({}))
    this._httpErrorSubject$.next(error);
  }

  getHttpSuccessSubject$(): Observable<HttpResponse<any>> {
    return this._httpSuccessSubject$.asObservable();
  }

  setHttpSuccessSubject$(success: HttpResponse<any>): void{
    this._httpErrorSubject$.next(new HttpErrorResponse({}))
    this._httpSuccessSubject$.next(success);
  }
}
