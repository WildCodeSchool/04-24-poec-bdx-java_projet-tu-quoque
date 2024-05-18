import { DestroyRef, Injectable } from '@angular/core';
import { BehaviorSubject, debounceTime, distinctUntilChanged, Observable } from 'rxjs';
import { BasicField } from '../models/types/basic-field.type';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { StatisticDetails } from '../../models/classes/statistic-details.class';
import { StatField } from '../models/types/stat-field.type';
import { SkillDetails } from '../../models/classes/skill-details.class';
import { Field } from '../models/types/field.type';
import { SkillField } from '../models/types/skill-field.type';
import { StatListField } from '../models/types/stat-list-field.type';

@Injectable({
  providedIn: 'root'
})
export class ListenPlayerActionService {
  sheetModifiedByPlayer: any = { "skills": [] };
  private sheetModifiedListener$: BehaviorSubject<any> = new BehaviorSubject(this.sheetModifiedByPlayer);

  constructor(private destroyRef: DestroyRef) { }

  sendInfos() {
    return this.sheetModifiedListener$.asObservable();
  }

  receiveFieldFrom(fromObs$: Observable<Field>) {
    fromObs$.pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe((field: Field) => {
      if (field.value instanceof SkillDetails) {
        this.receiveSkillField(field as SkillField);
      } else if (field.value instanceof StatisticDetails) {
        this.receiveStatField(field as StatField);
      } else if (field.value instanceof Array) {
        this.receiveStatListField(field as StatListField)
      } else {
        this.receiveBasicField(field as BasicField)
      }
    })
  }

  controlField(field: BasicField) {
    if (['characterRace', 'gender'].includes(field.index)) {
      this.sheetModifiedByPlayer.height = '';
      this.sheetModifiedByPlayer.weight = '';
      this.sheetModifiedByPlayer.heightModifierRolled = '';
    }
    if (['characterRace', 'characterClass'].includes(field.index)) {
      this.sheetModifiedByPlayer.age = '';
    }
  }

  receiveBasicField(field: BasicField): void {
    //this.controlField(field);
    this.sheetModifiedByPlayer[field.index] = field.value;
    this.updateSheetStream();
  }

  receiveStatListField(field: StatListField) {
    const statList: StatisticDetails[] = field.value;
    this.sheetModifiedByPlayer["stats"] = statList;
    this.updateSheetStream();
  }

  receiveStatField(statField: StatField) {
    this.sheetModifiedByPlayer["stats"][statField.index] = statField.value;
    this.updateSheetStream()
  }

  receiveSkillField(field: SkillField) {
    this.sheetModifiedByPlayer['skills'][field.value.id] =
    {
      rank: field.value.ranks,
      complement: field.value.complement
    };
    this.updateSheetStream();
  }

  updateSheetStream() {
    this.sheetModifiedListener$.next(this.sheetModifiedByPlayer);
  }
}
