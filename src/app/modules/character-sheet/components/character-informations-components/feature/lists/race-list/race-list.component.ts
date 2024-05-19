import { Component } from '@angular/core';
import { Race } from '../../../../../models/types/race.type';
import { Observable } from 'rxjs';
import { AbstractListComponent } from '../abstract-list-component.component';

@Component({
  selector: 'app-race-list',
  templateUrl: './race-list.component.html',
  styleUrl: './race-list.component.scss'
})
export class RaceListComponent extends AbstractListComponent {
  raceList$: Observable<Race[]> = this.dbService.getRaces$();
  selectName: string = "characterRace";
  selectLabel: string = "RACE";
}
