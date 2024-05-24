import { DestroyRef, Injectable } from '@angular/core';
import { CharacterSheetService } from './character-sheet.service';
import { map, Observable, switchMap } from 'rxjs';
import { CharacterClass } from '../../models/types/character-class.type';
import { BaseAttackBonusService } from './attack-base-bonus.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ListenPlayerActionService } from './listen-player-action.service';

@Injectable({
  providedIn: 'root'
})
export class BaseAttackBonusService {
  baseAttackBonusStream$!: Observable<number[]>;
  constructor(
    private sheetService: CharacterSheetService,
    private listener: ListenPlayerActionService,
    private destroyRef: DestroyRef
  ) {
    this.init();
  }

  init() {
    this.baseAttackBonusStream$ = this.listener.sendInfos().pipe(
      switchMap(() =>
        this.sheetService.getLevel$().pipe(
          takeUntilDestroyed(this.destroyRef),
          switchMap((level: number) => this.sheetService.getClasseDetails$().pipe(
            map((classDetail: CharacterClass) => {
              if (classDetail) {
                return BaseAttackBonusService.getValue(level, classDetail.baseAttackBonus);
              }
              return [0];
            }),
          )),
        )
      )
    )
  }
}
