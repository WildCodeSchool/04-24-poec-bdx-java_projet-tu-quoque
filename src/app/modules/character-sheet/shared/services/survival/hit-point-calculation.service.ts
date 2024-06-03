import { Injectable } from '@angular/core';
import { PossibleDice, PossibleDiceKey } from '../../../../shared/models/enums/possible-dice.enum';
import { StatisticDetails } from '../../../models/classes/statistic-details.class';
import { DiceService } from '../../../../shared/services/dice-service/dice.service';

@Injectable({
  providedIn: 'root'
})
export class HitPointCalculationService {

  public static setHitPoints(dice: PossibleDiceKey, level: number, con: StatisticDetails): number {
    let diceValue: number = PossibleDice[dice.toString() as PossibleDiceKey];
    let hitPoints: number = diceValue + con.getFinalMod();
    for (let i = 1; i < level; i++) {
      let moreHp = DiceService.throwOneDice(dice) + con.getFinalMod();
      if (moreHp < 1) moreHp = 1;
      hitPoints += moreHp;
    }
    return hitPoints;
  }
}
