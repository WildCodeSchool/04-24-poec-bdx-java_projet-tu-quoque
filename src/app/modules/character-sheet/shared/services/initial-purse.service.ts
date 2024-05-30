import { DestroyRef, inject, Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Purse } from '../../models/classes/purse-related/purse.class';
import { CharacterClass } from '../../models/types/character-class.type';
import { CharacterSheetService } from './character-sheet.service';
import { DiceService } from '../../../shared/services/dice-service/dice.service';
import { PurseFactory } from '../../models/classes/purse-related/purse-factory.class';

@Injectable({
  providedIn: 'root'
})
export class InitialPurseService {
  purse$: BehaviorSubject<Purse> = new BehaviorSubject<Purse>(new Purse());
  classDetails$: Observable<CharacterClass> = inject(CharacterSheetService).getClasseDetails$();
  className!: string;

  destroyRef: DestroyRef = inject(DestroyRef);

  constructor() {
    this.streamInitialPurse();
  }

  streamInitialPurse(): void {
    this.classDetails$.pipe(
      map((classDetails) => {
        if (classDetails) {
          if (classDetails.name !== this.className) {
            this.className = classDetails.name;
            return classDetails.startingMoney;
          }
        }
        return "";
      }),
    ).subscribe((money) => {
      if (money)
        this.purse$.next(PurseFactory.createInitialPurse(this.transformDiceIntoMoney(money)))
    }
    );
  }

  transformDiceIntoMoney(moneyInDices: string): number {
    if (!moneyInDices) return 0;
    let multiplier = 1;
    if (moneyInDices.includes('x')) {
      multiplier = +moneyInDices.split('x')[1];
      moneyInDices = moneyInDices.split('x')[0];
    }
    return DiceService.roll(moneyInDices) * multiplier;
  }

  getPurse$(): Observable<Purse> {
    return this.purse$.asObservable();
  }
}
