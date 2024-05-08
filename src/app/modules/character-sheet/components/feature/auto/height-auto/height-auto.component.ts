import { Component, OnInit } from '@angular/core';
import { distinctUntilChanged, map, Observable } from 'rxjs';
import { CharacterSheetService } from '../../../../shared/services/character-sheet.service';
import { ListenPlayerActionService } from '../../../../shared/services/listen-player-action.service';

@Component({
  selector: 'app-height-auto',
  templateUrl: './height-auto.component.html',
  styleUrl: './height-auto.component.scss'
})
export class HeightAutoComponent implements OnInit {
  height$: Observable<string> = this.characterSheetService.setHeight$();

  constructor(
    private characterSheetService: CharacterSheetService,
    private listener: ListenPlayerActionService
  ) {
  }

  ngOnInit() {
    this.listener.receiveInfoFrom(this.height$.pipe(
      distinctUntilChanged(),
      map(heightValue => {
        return { name: "height", value: heightValue }
      })
    ));
  }
}

