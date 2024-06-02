import { Injectable } from '@angular/core';
import { CharacterSheetService } from '../character-sheet.service';
import { map, Observable, switchMap, tap } from 'rxjs';
import { CharacterClass } from '../../../models/types/character-class.type';
import { BaseAttackBonusCalculationService } from './base-attack-bonus-calculation.service';
import { ListenPlayerActionService } from '../listen-player-action.service';

@Injectable({
  providedIn: 'root'
})
export class BaseAttackBonusStreamService {
  baseAttackBonusStream$!: Observable<number[]>;
  constructor(
    private sheetService: CharacterSheetService,
    private listener: ListenPlayerActionService,
  ) {
    this.init();
  }

  init() {
    this.baseAttackBonusStream$ = this.listener.sendInfos().pipe(
      switchMap(() =>
        this.sheetService.getLevel$().pipe(
          switchMap((level: number) => this.sheetService.getClasseDetails$().pipe(
            map((classDetail: CharacterClass) => {
              if (classDetail) {
                return BaseAttackBonusCalculationService.getValue(level, classDetail.baseAttackBonus);
              }
              return [NaN];
            }),
          )),
        )
      )
    )
  }
}
