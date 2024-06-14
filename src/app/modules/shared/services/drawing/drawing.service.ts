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

  postDrawing(name: string, url: string, tableId: number): Observable<DrawingDTO> {
    const headers = this.getHeaders(); 
    const drawing = {
      name,
      content: url,
      tableId
    };
    return this._http.post<DrawingDTO>(`${this._BASE_URL}/add/${tableId}`, drawing, { headers });
  }
}
