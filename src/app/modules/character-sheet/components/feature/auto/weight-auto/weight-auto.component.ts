import { Component } from '@angular/core';
import { distinctUntilChanged, map, Observable } from 'rxjs';
import { CharacterSheetService } from '../../../../shared/services/character-sheet.service';
import { ListenPlayerActionService } from '../../../../shared/services/listen-player-action.service';

@Component({
  selector: 'app-weight-auto',
  templateUrl: './weight-auto.component.html',
  styleUrl: './weight-auto.component.scss'
})
export class WeightAutoComponent {
  weight$: Observable<string> = this.characterSheetService.setWeight$();
  unit: string = "kgs";
  label: string = "POIDS";

  constructor(
    private characterSheetService: CharacterSheetService,
    private listener: ListenPlayerActionService
  ) {
  }

  ngOnInit() {
    this.listener.receiveInfoFrom(this.weight$.pipe(
      distinctUntilChanged(),
      map(weightValue => {
        return { name: "weight", value: weightValue }
      })
    ));
  }
}
