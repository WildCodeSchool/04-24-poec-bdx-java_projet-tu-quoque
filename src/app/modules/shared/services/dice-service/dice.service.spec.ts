import { DiceService } from './dice.service';

describe('DiceService', () => {
  type diceResult = {
    value: number;
    nb: number;
  }

  it('should be > 0', () => {
    expect(DiceService.throwOneDice("d4")).toBeGreaterThan(0);
  });

  it('d3 should be < 4', () => {
    expect(DiceService.throwOneDice("d3")).toBeLessThan(4);
  })

  it('should be less than 5% in 100 000 lauches for d6', () => {
    let launchesForD6: diceResult[] = [
      { value: 1, nb: 0 },
      { value: 2, nb: 0 },
      { value: 3, nb: 0 },
      { value: 4, nb: 0 },
      { value: 6, nb: 0 },
      { value: 6, nb: 0 },
    ];
    const NB_TRIES = 100 * 1000;
    let min = NB_TRIES;
    let max = 0;
    for (let i = 0; i < NB_TRIES; i += 1) {
      const actualLauch = DiceService.throwOneDice("d6");
      for (let dice of launchesForD6) {
        if (dice.value === actualLauch) {
          dice.nb += 1;
        }
      }
    }
    for (let dice of launchesForD6) {
      if (dice.nb > max) {
        max = dice.nb;
      }
      if (dice.nb < min) {
        min = dice.nb
      }
      expect(dice.value).toBeGreaterThanOrEqual(1);
      expect(dice.value).toBeLessThanOrEqual(6);
    }
    const differenceInPercent = (max - min) / NB_TRIES * 100;
    expect(differenceInPercent).toBeLessThanOrEqual(5);
  });

  it('should be beetwen 15 and 30 for 3d6 + 12', () => {
    const launchesFor3D6plus12: diceResult[] = [];
    let min = Infinity;
    let max = - Infinity;
    for (let i = 0; i < 100; i += 1) {
      const value = DiceService.throwDices(3, "d6", 12);
      if (value > max) max = value;
      if (value < min) min = value;
    }
    expect(max).toBeLessThanOrEqual(30);
    expect(min).toBeLessThanOrEqual(30);
    expect(max).toBeGreaterThanOrEqual(15);
    expect(min).toBeGreaterThanOrEqual(15);
  });

  it('should be beetwen 3 and 18 for stats throws', () => {
    let min = Infinity;
    let max = - Infinity;
    for (let i = 0; i < 100; i += 1) {
      const value = DiceService.throwDicesForStatistic();
      if (value > max) max = value;
      if (value < min) min = value;
    }
    expect(max).toBeLessThanOrEqual(18);
    expect(min).toBeLessThanOrEqual(18);
    expect(max).toBeGreaterThanOrEqual(3);
    expect(min).toBeGreaterThanOrEqual(3);
  });

  it('should be between 8 and 18 for 2d6+6 roll', () => {
    let min = Infinity;
    let max = - Infinity;
    for (let i = 0; i < 1000; i += 1) {
      const value = DiceService.roll("2d6+6");
      if (value > max) max = value;
      if (value < min) min = value;
    }
    expect(max).toBe(18);
    expect(min).toBe(8);
  });
});
