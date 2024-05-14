import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, shareReplay } from 'rxjs';
import { Race } from '../../../character-sheet/models/types/race.type';
import { CharacterClass } from '../../../character-sheet/models/types/character-class.type';
import { Alignment } from '../../../character-sheet/models/types/alignment.type';
import { Gender } from '../../../character-sheet/models/types/gender.type';
import { SkillFromDb } from '../../../character-sheet/models/types/skill-from-db.type';

@Injectable({
  providedIn: 'root'
})
export class DbService {
  private readonly INDEX_URL: string = "http://localhost:3000/";
  private readonly RACES_ENDPOINT: string = "races";
  private readonly CLASSES_ENDPOINT: string = "classes";
  private readonly ALIGNMENTS_ENDPOINT: string = "alignments";
  private readonly GENDERS_ENDPOINT: string = "genders";
  private readonly SKILLS_ENDPOINT: string = "skills";

  private race$: Observable<Race[]>;

  constructor(private http: HttpClient) {
    this.race$ = this.setRaces$();
  }

  getEndpoint$(endpoint: string): Observable<any> {
    return this.http.get<any>(this.INDEX_URL + endpoint);
  }

  setRaces$(): Observable<Race[]> {
    return this.getEndpoint$(this.RACES_ENDPOINT).pipe(shareReplay());
  }
  getRaces$(): Observable<Race[]> {
    return this.race$;
  }

  getClasses$(): Observable<CharacterClass[]> {
    return this.getEndpoint$(this.CLASSES_ENDPOINT).pipe(shareReplay());
  }

  getAlignments$(): Observable<Alignment[]> {
    return this.getEndpoint$(this.ALIGNMENTS_ENDPOINT);
  }

  getGenders$(): Observable<Gender[]> {
    return this.getEndpoint$(this.GENDERS_ENDPOINT);
  }

  getSkills$(): Observable<SkillFromDb[]> {
    return this.getEndpoint$(this.SKILLS_ENDPOINT);
  }


}
