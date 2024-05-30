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
