import { DestroyRef, inject, Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, Subject, switchMap, tap } from 'rxjs';
import { BasicField } from '../models/types/basic-field.type';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { StatisticDetails } from '../../models/classes/statistic-details.class';
import { StatField } from '../models/types/stat-field.type';
import { SkillDetails } from '../../models/classes/skill-details.class';
import { Field } from '../models/types/field.type';
import { SkillField } from '../models/types/skill-field.type';
import { StatListField } from '../models/types/stat-list-field.type';
import { SkillInfosAddByPlayer } from '../classes/skill-infos-add-by-player.class';
import { Purse } from '../../models/classes/purse-related/purse.class';
import { PurseField } from '../models/types/purse-field.type';
import { WeaponField } from '../models/types/weapon-field.type';
import { Weapon } from '../../models/classes/weapon.class';
import { CharacterStats } from '../../models/classes/character-stats.class';
import { Sheet, SheetKeyForStringKeys } from '../../models/types/sheet.type';
import { ConnectionSheetService } from './connection-sheet.service';
import { TransformDtoToSheetService } from './transform-dto-to-sheet.service';
import { SheetDTO } from '../../models/types/dto/sheet-dto.type';

@Injectable({
  providedIn: 'root'
})
export class ListenPlayerActionService {
  sheetModifiedByPlayer: Sheet = {
    skills: [], weapons: [],
    age: '',
    alignment: '',
    characterClass: '',
    characterName: '',
    characterRace: '',
    eyesColor: '',
    gender: '',
    god: '',
    hairColor: '',
    heightModifierRolled: '',
    level: '',
    playerName: '',
    skinColor: '',
    stats: new CharacterStats(),
    weightModifierRolled: '',
    purse: new Purse()
  };

  private connectionSheetService: ConnectionSheetService = inject(ConnectionSheetService);
  private destroyRef: DestroyRef = inject(DestroyRef);
  private transformDTOService: TransformDtoToSheetService = inject(TransformDtoToSheetService);
  private sheetModifiedListener$: BehaviorSubject<any> = new BehaviorSubject(this.sheetModifiedByPlayer);
  sheetId$: Subject<number> = new Subject();

  constructor() {
    this.sheetId$.pipe(
      takeUntilDestroyed(this.destroyRef),
      switchMap((id: number) => this.connectionSheetService.getSheetById$(id).pipe(
        map((sheet: SheetDTO) => this.transformDTOService.transform(sheet)),
        tap(sheet => this.sheetModifiedByPlayer = sheet),
        tap(sheet => this.sheetModifiedListener$.next(sheet)),
        tap(sheet => this.updateSheetStream())
      ))
    ).subscribe();
  }

  setId(id$: Observable<number>) {
    id$.pipe(
      takeUntilDestroyed(this.destroyRef),
    ).subscribe(num => this.sheetId$.next(num))


  }

  sendInfos(): Observable<Sheet> {
    return this.sheetModifiedListener$.asObservable();
  }

  receiveFieldFrom(fromObs$: Observable<Field>): void {
    fromObs$.pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe((field: Field) => {
      if (field.value instanceof SkillDetails) {
        this.receiveSkillField(field as SkillField);
      } else if (field.value instanceof Weapon) {
        this.receiveWeapon(field as WeaponField);
      } else if (field.value instanceof StatisticDetails) {
        this.receiveStatField(field as StatField);
      } else if (field.value instanceof Purse) {
        this.receivePurseField(field as PurseField);
      } else if (field.value instanceof CharacterStats) {
        this.receiveStatListField(field as StatListField)
      } else {
        this.receiveBasicField(field as BasicField)
      }
    });
  }

  controlField(field: BasicField): void {
    if (['characterRace', 'gender'].includes(field.index)) {
      this.sheetModifiedByPlayer.heightModifierRolled = '';
      this.sheetModifiedByPlayer.weightModifierRolled = '';
    }
    if (['characterRace'].includes(field.index) && this.sheetModifiedByPlayer.stats) {
      this.sheetModifiedByPlayer.stats.resetRaceModifier();

    }
    if (['characterRace', 'characterClass'].includes(field.index)) {
      this.sheetModifiedByPlayer.age = '';
    }
  }

  receiveBasicField(field: BasicField): void {
    this.controlField(field);
    this.sheetModifiedByPlayer[field.index as SheetKeyForStringKeys] = field.value;
    this.updateSheetStream();
  }

  receiveStatListField(field: StatListField): void {
    const statList: CharacterStats = field.value;
    this.sheetModifiedByPlayer["stats"] = statList;
    this.updateSheetStream();
  }

  receiveStatField(statField: StatField): void {
    this.sheetModifiedByPlayer["stats"][statField.value.abbr] = statField.value;
    this.updateSheetStream();
  }

  receiveSkillField(field: SkillField): void {
    this.sheetModifiedByPlayer['skills'][field.value.id] =
      new SkillInfosAddByPlayer(
        field.value.id,
        field.value.ranks,
        field.value.complement
      );
    this.updateSheetStream();
  }

  receivePurseField(field: PurseField): void {
    this.sheetModifiedByPlayer['purse'] = field.value;
    this.updateSheetStream();
  }

  receiveWeapon(field: WeaponField): void {
    this.sheetModifiedByPlayer["weapons"][field.index] = field.value;
    this.updateSheetStream();
  }

  updateSheetStream(): void {
    this.sheetModifiedListener$.next(this.sheetModifiedByPlayer);
  }
}
