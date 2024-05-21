import { Injectable } from '@angular/core';
import { SavingThrowType, SavingThrowTypeKey } from '../../models/enums/saving-throws-type.enum';

@Injectable({
  providedIn: 'root'
})
export class SavingThrowsBaseBonusService {
  constructor() { }

  static getValue(level: number, savingType: SavingThrowTypeKey) {
    if (savingType == "low") {
      return this.getLowValue(level);
    } else if (savingType == "high") {
      return this.getHighValue(level);
    }
    throw new Error("There's a problem with SavingThrowType in SavingThrowBaseBonus.getValue")
  }

  private static getLowValue(level: number) {
    return Math.floor(level / 3);
  }

  private static getHighValue(level: number) {
    return Math.floor(level / 2) + 2;
  }
}
