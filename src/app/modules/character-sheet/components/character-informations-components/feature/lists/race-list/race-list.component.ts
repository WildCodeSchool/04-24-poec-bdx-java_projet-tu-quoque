import { Component } from '@angular/core';
import { Race } from '../../../../../models/types/race.type';
import { map, Observable } from 'rxjs';
import { AbstractListComponent } from '../abstract-list-component.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Sheet } from '../../../../../models/types/sheet.type';

@Component({
  selector: 'app-race-list',
  templateUrl: './race-list.component.html',
  styleUrl: './race-list.component.scss'
})
export class RaceListComponent extends AbstractListComponent {
  raceList$: Observable<Race[]> = this.dbService.getRaces$();
  selectName: string = "characterRace";
  selectLabel: string = "RACE";
  actual$!: Observable<string>;

  ngOnInit() {
    this.listener.sendInfos().pipe(
      map((sheet: Sheet) => sheet.characterRace)
    );
  }
}
