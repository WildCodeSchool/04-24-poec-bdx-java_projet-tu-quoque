import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Observable, catchError, of, tap, throwError } from 'rxjs';
import { LocalStorageService } from '../modules/shared/services/connection/local-storage.service';
import { HttpRequestService } from '../modules/shared/services/connection/http-request.service';
import { Router } from '@angular/router';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(
    private localStoragesService: LocalStorageService,
    private httpRequestService: HttpRequestService,
    private _router: Router
  ) { }

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const idToken = this.localStoragesService.getToken();

    if (idToken) {
      const cloned = request.clone({
        headers: request.headers.set('Authorization', 'Bearer ' + idToken),
      });
      return this.mapStream(cloned, next);
    } else {
      return this.mapStream(request, next);
    }
  }

  mapStream(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      tap((incomingRequest) => {
        if (incomingRequest instanceof HttpResponse) {
          this.httpRequestService.setHttpSuccessSubject$(incomingRequest);
        }
      }),
      catchError((err: HttpErrorResponse) => {
        console.log(err);
        this.httpRequestService.setHttpErrorSubject$(err);
        this._router.navigate(['/visitor/home'])

        return of();
      })
    );
  }
}
