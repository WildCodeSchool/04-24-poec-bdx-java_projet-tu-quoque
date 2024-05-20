import { Injectable } from '@angular/core';
import { SavingThrowType } from '../../models/enums/saving-throws-type.enum';

@Injectable({
  providedIn: 'root'
})
export class SavingThrowsBaseBonusService {
  constructor() { }

  static getValue(level: number, savingType: SavingThrowType) {
    if (savingType == SavingThrowType.low) {
      return this.getLowValue(level);
    } else {
      return this.getHighValue(level);
    }
  }

  private static getLowValue(level: number) {
    return Math.floor(level / 3);
  }

  private static getHighValue(level: number) {
    return Math.floor(level / 2) + 2;
  }
}
