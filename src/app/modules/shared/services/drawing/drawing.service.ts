import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Drawing } from '../../models/types/users/drawing.type';
import { ApiRessourceService } from '../api-ressource/api-ressource.service';

@Injectable({
  providedIn: 'root',
})
export class DrawingService extends ApiRessourceService<Drawing> {
  
  private readonly _BASE_URL: string = 'http://localhost:3000/drawings';

  constructor(protected override _http: HttpClient) {
    super(_http);
  }

  override getRessourceUrl(): string {
    return this._BASE_URL;
  }

  getDrawingListByTable$(tableId: number): Observable<Drawing[]> {
    return this.getAll$().pipe(
      map((result: Drawing[]) =>
        result.filter((drawing: Drawing) => Number(drawing.tableId) === tableId)
      )
    );
  }

  save(canvas: HTMLCanvasElement): Observable<any> {
    return new Observable(observer => {
      canvas.toBlob(blob => {
        if (blob) {
          // TODO quand on aura le back :
          // const formData = new FormData();
          // formData.append('file', blob, 'drawing.png');

          // const headers = new HttpHeaders({
          //   //'Authorization': 'Bearer YOUR_AUTH_TOKEN',  // Remplacer 'YOUR_AUTH_TOKEN' par le vrai token
          //   // 'Content-Type': 'multipart/form-data', // Généralement géré automatiquement par FormData (?)
          //   // 'X-Custom-Header': 'CustomHeaderValue'  // Personnaliser l'en-tête (?)
          // });

          // this._http.post(`${this._BASE_URL}/upload`, formData, { headers })
          //   .subscribe({
          //     next: response => {
          //       observer.next(response);
          //       observer.complete();
          //     },
          //     error: err => observer.error(err)
          //   });
          console.log(blob);
          observer.next(blob);
          observer.complete();
        } else {
          observer.error('Failed to create Blob from canvas');
        }
      }, 'image/png');
    });
  }
}
