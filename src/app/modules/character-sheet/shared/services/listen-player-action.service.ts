import { DestroyRef, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { BasicField } from '../models/types/basic-field.type';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { StatisticDetails } from '../../models/classes/statistic-details.class';
import { StatField } from '../models/types/stat-field.type';
import { SkillDetails } from '../../models/classes/skill-details.class';
import { Field } from '../models/types/field.type';
import { SkillField } from '../models/types/skill-field.type';
import { StatListField } from '../models/types/stat-list-field.type';
import { FieldInfosAddByPlayer } from '../classes/skill-infos-add-by-player.class';
import { Purse } from '../../models/classes/purse-related/purse.class';
import { PurseField } from '../models/types/purse-field.type';
import { WeaponField } from '../models/types/weapon-field.type';
import { Weapon } from '../../models/classes/weapon.class';

@Injectable({
  providedIn: 'root'
})
export class ListenPlayerActionService {
  sheetModifiedByPlayer: any = { "skills": [], "weapons": [] };
  private sheetModifiedListener$: BehaviorSubject<any> = new BehaviorSubject(this.sheetModifiedByPlayer);

  constructor(private destroyRef: DestroyRef) { }

  sendInfos(): Observable<any> {
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
      } else if (field.value instanceof Array) {
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
    if (['characterRace', 'characterClass'].includes(field.index)) {
      this.sheetModifiedByPlayer.age = '';
    }
  }

  receiveBasicField(field: BasicField): void {
    this.controlField(field);
    this.sheetModifiedByPlayer[field.index] = field.value;
    this.updateSheetStream();
  }

  receiveStatListField(field: StatListField): void {
    const statList: StatisticDetails[] = field.value;
    this.sheetModifiedByPlayer["stats"] = statList;
    this.updateSheetStream();
  }

  receiveStatField(statField: StatField): void {
    this.sheetModifiedByPlayer["stats"][statField.index] = statField.value;
    this.updateSheetStream();
  }

  receiveSkillField(field: SkillField): void {
    this.sheetModifiedByPlayer['skills'][field.value.id] =
      new FieldInfosAddByPlayer(
        field.value.ranks,
        field.value.complement
      );
    this.updateSheetStream();
  }

  receivePurseField(field: PurseField): void {
    this.sheetModifiedByPlayer['purse'] = field.value;
    console.log(this.sheetModifiedByPlayer['purse']);
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
