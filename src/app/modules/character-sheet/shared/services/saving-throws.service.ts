import { DestroyRef, inject, Injectable } from '@angular/core';
import { CharacterSheetService } from './character-sheet.service';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { StatisticDetails } from '../../models/classes/statistic-details.class';
import { CharacterClass } from '../../models/types/character-class.type';
import { SavingThrows } from '../../models/types/saving-throws.type';
import { CharacterSavingThrows } from '../../models/classes/character-saving-throws.class';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SavingThrowType } from '../../models/enums/saving-throws-type.enum';
import { SavingThrowsEnum } from '../../models/enums/saving-throw-enum.enum';
import { Race } from '../../models/types/race.type';

@Injectable({
  providedIn: 'root'
})
export class SavingThrowsService {
  private sheetService: CharacterSheetService = inject(CharacterSheetService);

  private level$: Observable<number> = this.sheetService.getLevel$();
  private caracs$: Observable<StatisticDetails[]> = this.sheetService.getCaracteristics$();
  private classSavingThrows$: Observable<SavingThrows> = this.getClassSavingThrows();
  private race$: Observable<Race> = this.sheetService.getRaceDetails$();

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
    this.update();
  }

  update() {
    this.observeRace();
    this.updateLevel();
    this.updateClass();
    this.updateStatsMod();
    this.updateStream();
  }

  observeRace() {
    this.race$.pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(race => this.updateStatsMod());
  }

  updateLevel(): void {
    this.level$.pipe(
      takeUntilDestroyed(this.destroyRef))
      .subscribe((level: number) => {
        this.characterSavingThrows.setLevel(level)

      })
  }

  updateClass(): void {
    this.classSavingThrows$.pipe(
      takeUntilDestroyed(this.destroyRef))
      .subscribe((classSavingThrows: SavingThrows) => {
        this.characterSavingThrows.classSavingThrows = classSavingThrows;

      })
  }

  updateStatsMod(): void {
    this.caracs$.pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe((stats: StatisticDetails[]) => {
      if (stats) {
        const fortitudeMod: number = (stats.find(stat => stat.abbr == SavingThrowsEnum.fortitude) as StatisticDetails).getFinalMod();
        const reflexesMod: number = (stats.find(stat => stat.abbr == SavingThrowsEnum.reflexes) as StatisticDetails).getFinalMod();
        const willMod: number = (stats.find(stat => stat.abbr == SavingThrowsEnum.will) as StatisticDetails).getFinalMod();
        this.characterSavingThrows.updateModValues(fortitudeMod, reflexesMod, willMod);
        this.updateStream();
      }
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
