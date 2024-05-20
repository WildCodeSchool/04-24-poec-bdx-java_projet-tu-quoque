import { Injectable } from '@angular/core';
import { AttackBaseBonusType } from '../../models/enums/attack-base-bonus-type.enum';

@Injectable({
  providedIn: 'root'
})
export class AttackBaseBonusService {

  constructor() { }
  // static getValue(level: number, bbaType: AttackBaseBonusType) {
  //   if (bbaType == AttackBaseBonusType.low) {
  //     return this.getLowValue(level);
  //   } else if (bbaType == AttackBaseBonusType.medium) {
  //     return this.getMediumValue(level);
  //   } else {
  //     return this.getHighValue(level);
  //   }
  // }

  static getValue(level: number, bbaType: AttackBaseBonusType) {
    const bba = Math.floor(level * bbaType);
    return this.getAllAttacks(bba);
  }

  private static getLowValue(level: number) {
    let bba = Math.floor(level / 2);
    return this.getAllAttacks(bba);
  }

  private static getMediumValue(level: number) {
    let bba = Math.floor(level * 3 / 4);
    return this.getAllAttacks(bba);
  }

  private static getHighValue(level: number) {
    return this.getAllAttacks(level);
  }

  private static getAllAttacks(bba: number) {
    const attacks = [bba];
    while ((bba -= 5) > 0) {
      attacks.push(bba);
    }
    return attacks;
  }

}
