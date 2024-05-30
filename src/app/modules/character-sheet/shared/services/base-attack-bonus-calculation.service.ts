import { Injectable } from '@angular/core';
import { BaseAttackBonusType, BaseAttackBonusTypeKey } from '../../models/enums/attack-base-bonus-type.enum';

@Injectable({
  providedIn: 'root'
})
export class BaseAttackBonusCalculationService {

  static getValue(level: number, baseAttackBonusType: BaseAttackBonusTypeKey): number[] {
    const baseAttackBonus = Math.floor(level * BaseAttackBonusType[baseAttackBonusType]);
    return this.getAllAttacks(baseAttackBonus);
  }

  private static getAllAttacks(baseAttackBonus: number): number[] {
    const attacks = [baseAttackBonus];
    while ((baseAttackBonus -= 5) > 0) {
      attacks.push(baseAttackBonus);
    }
    return attacks;
  }
}
