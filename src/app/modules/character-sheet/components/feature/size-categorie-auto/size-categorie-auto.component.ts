import { Component, DestroyRef, OnInit } from '@angular/core';
import { ListenPlayerActionService } from '../../../shared/services/listen-player-action.service';
import { distinctUntilChanged, first, map, Observable, switchMap, tap } from 'rxjs';
import { DbService } from '../../../../shared/services/db-service/db.service';
import { Race } from '../../../models/types/race.type';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CharacterSheetService } from '../../../shared/services/character-sheet.service';
import { Field } from '../../../shared/models/types/field.type';

@Component({
  selector: 'app-size-categorie-auto',
  templateUrl: './size-categorie-auto.component.html',
  styleUrl: './size-categorie-auto.component.scss'
})
export class SizeCategorieAutoComponent implements OnInit {

  //race$: Observable<Race> = this.characterSheetService.getRace$();
  sizeCategory$: Observable<string> = this.characterSheetService.setSizeCategory$()
  constructor(
    private characterSheetService: CharacterSheetService,
    private listener: ListenPlayerActionService
  ) {

  }

  ngOnInit() {
    //this.race$.subscribe(race => console.log(race));
    //this.characterSheetService.setSizeCategory$();
    this.listener.receiveInfoFrom(this.sizeCategory$.pipe(
      distinctUntilChanged(),
      map(sizeValue => {
        return { name: "sizeCategory", value: sizeValue }
      })
    ));
  }
}
