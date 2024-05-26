import { DestroyRef, inject, Injectable } from '@angular/core';
import { InitialPurseService } from './initial-purse.service';
import { Observable, Subject } from 'rxjs';
import { Purse } from '../../models/classes/purse-related/purse.class';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root'
})
export class PurseService {
  initialPurse$ = inject(InitialPurseService).getPurse$();
  purse$: Subject<Purse> = new Subject();
  destroyRef = inject(DestroyRef);

  constructor() {
    this.init();
  }

  init(): void {
    this.initialPurse$.pipe(
      takeUntilDestroyed(this.destroyRef),
    ).subscribe((purse: Purse) => this.purse$.next(purse));
  }

  getPurse$(): Observable<Purse> {
    return this.purse$.asObservable();
  }
}
