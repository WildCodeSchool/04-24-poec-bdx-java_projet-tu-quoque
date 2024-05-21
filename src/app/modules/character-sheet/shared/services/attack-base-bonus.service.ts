import { Injectable } from '@angular/core';
import { AttackBaseBonusType } from '../../models/enums/attack-base-bonus-type.enum';

@Injectable({
  providedIn: 'root'
})
export class AttackBaseBonusService {

  static getValue(level: number, bbaType: AttackBaseBonusType) {
    const bba = Math.floor(level * bbaType);
    return this.getAllAttacks(bba);
  }

  private static getAllAttacks(bba: number) {
    const attacks = [bba];
    while ((bba -= 5) > 0) {
      attacks.push(bba);
    }
    return attacks;
  }

}
