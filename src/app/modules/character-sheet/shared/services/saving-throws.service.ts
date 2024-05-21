import { DestroyRef, inject, Injectable } from '@angular/core';
import { CharacterSheetService } from './character-sheet.service';
import { BehaviorSubject, map, Observable, switchMap, tap } from 'rxjs';
import { StatisticDetails } from '../../models/classes/statistic-details.class';
import { CharacterClass } from '../../models/types/character-class.type';
import { SavingThrows } from '../../models/types/saving-throws.type';
import { CharacterSavingThrows } from '../../models/classes/character-saving-throws.class';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SavingThrowType } from '../../models/enums/saving-throws-type.enum';

@Injectable({
  providedIn: 'root'
})
export class SavingThrowsService {
  private sheetService: CharacterSheetService = inject(CharacterSheetService);

  private level$: Observable<number> = this.sheetService.getLevel$();
  private caracs$: Observable<StatisticDetails[]> = this.sheetService.getCaracteristics$();
  private classSavingThrows$: Observable<SavingThrows> = this.getClassSavingThrows();

  private characterSavingThrows = new CharacterSavingThrows();

  private characterSavingThrow$: BehaviorSubject<CharacterSavingThrows> = new BehaviorSubject(this.characterSavingThrows);

  constructor(private destroyRef: DestroyRef) {
    this.init();
  }

  getClassSavingThrows(): Observable<SavingThrows> {
    return this.sheetService.characterClass$.pipe(
      map((characterClass: CharacterClass) => {
        if (characterClass) {
          return characterClass.savingThrowsBonus
        }
        else {
          return {
            reflexes: SavingThrowType.low,
            fortitude: SavingThrowType.low,
            will: SavingThrowType.low
          }
        }
      }
      ))
  }

  init(): void {
    this.updateLevel();
    this.updateClass();
  }

  updateLevel(): void {
    this.level$.pipe(
      takeUntilDestroyed(this.destroyRef))
      .subscribe((level: number) => {
        this.characterSavingThrows.setLevel(level),
          this.updateStream();
      })
  }

  updateClass(): void {
    this.classSavingThrows$.pipe(
      takeUntilDestroyed(this.destroyRef))
      .subscribe((classSavingThrows: SavingThrows) => {
        this.characterSavingThrows.classSavingThrows = classSavingThrows;
        this.updateStream();
      })

  }

  getCharacterSavingThrows$(): Observable<CharacterSavingThrows> {
    return this.characterSavingThrow$.asObservable();
  }

  updateBaseValues(): void {
    if (this.characterSavingThrows.level && this.characterSavingThrows.classSavingThrows) {
      this.characterSavingThrows.updateSavingThrows();
    }
  }

  updateStream(): void {
    this.updateBaseValues();
    this.characterSavingThrow$.next(this.characterSavingThrows)
  }

}
