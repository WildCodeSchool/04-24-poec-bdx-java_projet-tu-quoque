import { Component, OnInit } from '@angular/core';
import { ListenPlayerActionService } from '../../../../shared/services/listen-player-action.service';
import { distinctUntilChanged, map, Observable } from 'rxjs';
import { CharacterSheetService } from '../../../../shared/services/character-sheet.service';


@Component({
  selector: 'app-size-categorie-auto',
  templateUrl: './size-categorie-auto.component.html',
  styleUrl: './size-categorie-auto.component.scss'
})
export class SizeCategorieAutoComponent implements OnInit {
  sizeCategory$: Observable<string> = this.characterSheetService.setSizeCategory$()
  unit: string = "";
  label: string = "CATEGORIE DE TAILLE";

  constructor(
    private characterSheetService: CharacterSheetService,
    private listener: ListenPlayerActionService
  ) {

  }

  ngOnInit() {
    this.listener.receiveInfoFrom(this.sizeCategory$.pipe(
      distinctUntilChanged(),
      map(sizeValue => {
        return { name: "sizeCategory", value: sizeValue }
      })
    ));
  }
}
