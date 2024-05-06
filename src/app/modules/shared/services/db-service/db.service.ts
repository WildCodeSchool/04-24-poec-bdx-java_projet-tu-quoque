import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Race } from '../../../character-sheet/models/types/race.type';
import { CharacterClass } from '../../../character-sheet/models/types/character-class.type';
import { Alignment } from '../../../character-sheet/models/types/alignment.type';

@Injectable({
  providedIn: 'root'
})
export class DbService {
  private readonly INDEX_URL: string = "http://localhost:3000/";
  private readonly RACES_ENDPOINT: string = "races";
  private readonly CLASSES_ENDPOINT: string = "classes";
  private readonly ALIGNMENTS_ENDPOINT: string = "alignments";

  constructor(private http: HttpClient) { }

  getEndpoint$(endpoint: string): Observable<any> {
    return this.http.get<any>(this.INDEX_URL + endpoint);
  }

  getRaces$(): Observable<Race[]> {
    return this.getEndpoint$(this.RACES_ENDPOINT);
  }

  getClasses$(): Observable<CharacterClass[]> {
    return this.getEndpoint$(this.CLASSES_ENDPOINT);
  }

  getAlignments$(): Observable<Alignment[]> {
    return this.getEndpoint$(this.ALIGNMENTS_ENDPOINT);
  }
}
