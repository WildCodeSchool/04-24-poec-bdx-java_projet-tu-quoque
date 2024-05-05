import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Race } from '../../../character-sheet/models/types/race.type';

@Injectable({
  providedIn: 'root'
})
export class DbService {
  private readonly INDEX_URL: string = "http://localhost:3000/";
  private readonly RACES_ENDPOINT: string = "races";

  constructor(private http: HttpClient) { }

  getEndpoint$(endpoint: string): Observable<any> {
    return this.http.get<any>(this.INDEX_URL + endpoint);
  }

  getRaces$(): Observable<Race[]> {
    return this.getEndpoint$(this.RACES_ENDPOINT);
  }
}
