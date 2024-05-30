import { DestroyRef, inject, Injectable } from '@angular/core';
import { InitialPurseService } from './initial-purse.service';
import { Observable, Subject } from 'rxjs';
import { Purse } from '../../models/classes/purse-related/purse.class';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ListenPlayerActionService } from './listen-player-action.service';
import { PurseField } from '../models/types/purse-field.type';

@Injectable({
  providedIn: 'root'
})
export class PurseService {
  initialPurse$ = inject(InitialPurseService).getPurse$();
  purse$: Subject<Purse> = new Subject();
  purse: Purse = new Purse();
  destroyRef = inject(DestroyRef);
  listener = inject(ListenPlayerActionService);
  purseField$: Subject<PurseField> = new Subject();

  constructor() {
    this.init();
    this.listener.receiveFieldFrom(this.purseField$);
  }

  init(): void {
    this.initialPurse$.pipe(
      takeUntilDestroyed(this.destroyRef),
    ).subscribe((purse: Purse) => {
      this.purse = purse;
      this.updatePurse(purse)
    }
    );
  }

  getPurse$(): Observable<Purse> {
    return this.purse$.asObservable();
  }

  updatePurse(purse: Purse = this.purse) {
    this.purse$.next(purse);
    const field = {
      index: "purse",
      value: purse
    };
    this.purseField$.next(field);
  }

  buy(amount: string) {
    this.purse.debt(amount);
    this.updatePurse();
  }

}
