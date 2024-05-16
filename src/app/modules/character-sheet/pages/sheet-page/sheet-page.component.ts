import { Component, OnInit } from '@angular/core';
import { DbService } from '../../../shared/services/db-service/db.service';
import { Observable } from 'rxjs';
import { Race } from '../../models/types/race.type';
import { CharacterClass } from '../../models/types/character-class.type';

@Component({
  selector: 'app-sheet-page',
  templateUrl: './sheet-page.component.html',
  styleUrl: './sheet-page.component.scss'
})
export class SheetPageComponent implements OnInit {
  raceList$!: Observable<Race[]>;
  classList$!: Observable<CharacterClass[]>;

  constructor(private dbService: DbService) { }

  ngOnInit(): void {
    this.raceList$ = this.dbService.getRaces$();
    this.classList$ = this.dbService.getClasses$();
  }
}
