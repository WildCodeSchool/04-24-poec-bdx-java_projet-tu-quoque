import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Drawing } from '../../models/types/users/drawing.type';
import { ApiRessourceService } from '../api-ressource/api-ressource.service';
import { environment } from '../../../../../environments/environment.development';
import { DrawingDTO } from '../../models/types/users/drawing-dto';

@Injectable({
  providedIn: 'root',
})
export class DrawingService extends ApiRessourceService<Drawing> {
  
  private readonly _BASE_URL: string = environment.baseUrl + '/drawings';

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

  postDrawing(canvas: HTMLCanvasElement, tableId: number): Observable<DrawingDTO> {
    const headers = this.getHeaders(); 
    return new Observable(observer => {
      canvas.toBlob(blob => {
        if (blob) {
          console.log(blob);
          const formData = new FormData();
          console.log(formData);
          formData.append('file', blob, 'drawing.png');
          
          this._http.post<DrawingDTO>(this._BASE_URL + `/add/${tableId}`, formData, { headers }).subscribe(
            (response) => { 
              observer.next(response);
              observer.complete();
            },
            (error) => {
              observer.error(error);
            }
          );
        } else {
          observer.error('Failed to create Blob from canvas');
        }
      }, 'image/png');
    });
  }
}
