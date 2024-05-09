import { Component } from '@angular/core';
import { distinctUntilChanged, map, Observable } from 'rxjs';
import { CharacterSheetService } from '../../../../shared/services/character-sheet.service';
import { ListenPlayerActionService } from '../../../../shared/services/listen-player-action.service';

@Component({
  selector: 'app-age-auto',
  templateUrl: './age-auto.component.html',
  styleUrl: './age-auto.component.scss'
})
export class AgeAutoComponent {
  age$: Observable<string> = this.characterSheetService.setAge$();
  unit: string = "ans";
  label: string = "AGE";

  constructor(
    private characterSheetService: CharacterSheetService,
    private listener: ListenPlayerActionService
  ) {
  }

  ngOnInit() {
    this.listener.receiveInfoFrom(this.age$.pipe(
      distinctUntilChanged(),
      map(ageValue => {
        return { name: "age", value: ageValue }
      })
    ));
  }
}
