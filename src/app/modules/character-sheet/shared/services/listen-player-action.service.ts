import { DestroyRef, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Field } from '../models/types/field.type';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root'
})
export class ListenPlayerActionService {
  sheetModifiedByPlayer: any = {};
  private sheetModifiedListener$: BehaviorSubject<any> = new BehaviorSubject(this.sheetModifiedByPlayer);

  constructor(private destroyRef: DestroyRef) { }

  receiveInfoFrom(fromObs$: Observable<Field>): void {
    fromObs$.pipe(
      takeUntilDestroyed(this.destroyRef),
    ).subscribe((field: Field) => {
      this.controlField(field);

      this.sheetModifiedByPlayer[field.name] = field.value;
      this.sheetModifiedListener$.next(this.sheetModifiedByPlayer);
    });
  }

  sendInfos() {
    return this.sheetModifiedListener$.asObservable();
  }

  controlField(field: Field) {
    if (['characterRace', 'gender'].includes(field.name)) {
      this.sheetModifiedByPlayer.height = '';
      this.sheetModifiedByPlayer.weight = '';
      this.sheetModifiedByPlayer.heightModifierRolled = '';
    }
    if (['characterRace', 'characterClass'].includes(field.name)) {
      this.sheetModifiedByPlayer.age = '';
    }
  }
}
