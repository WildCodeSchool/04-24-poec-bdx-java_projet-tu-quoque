import { HitPointCalculationService } from './hit-point-calculation.service';
import { PossibleDiceKey } from '../../../../shared/models/enums/possible-dice.enum';
import { StatisticDetails } from '../../../models/classes/statistic-details.class';

describe('HitPointCalculationService', () => {


  it('hitpoint should be > 5 and < 15', () => {
    for (let i = 0; i < 1; i++) {
      const dice: PossibleDiceKey = "d10";
      const con: StatisticDetails = new StatisticDetails("CON");
      expect(HitPointCalculationService.setHitPoints(dice, 1, con)).toBeLessThan(15);
      expect(HitPointCalculationService.setHitPoints(dice, 1, con)).toBeGreaterThan(5);
    }
  });

  it('hitpoint should be > 10 and < 30', () => {
    for (let i = 0; i < 1000; i++) {
      const dice: PossibleDiceKey = "d10";
      const con: StatisticDetails = new StatisticDetails("CON");
      expect(HitPointCalculationService.setHitPoints(dice, 2, con)).toBeLessThan(30);
      expect(HitPointCalculationService.setHitPoints(dice, 2, con)).toBeGreaterThan(6);
    }
  });
});
