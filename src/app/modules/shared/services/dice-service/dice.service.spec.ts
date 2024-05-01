import { TestBed } from '@angular/core/testing';

import { DiceService } from './dice.service';
import { PossibleDice } from '../../models/enums/possible-dice.enum';

describe('DiceService', () => {
  let service: DiceService;
  type diceResult = {
    value: number;
    nb: number;
  }
  let launchesForD6: diceResult[] = [
    { value: 1, nb: 0 },
    { value: 2, nb: 0 },
    { value: 3, nb: 0 },
    { value: 4, nb: 0 },
    { value: 6, nb: 0 },
    { value: 6, nb: 0 },
  ];


  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be > 0', () => {
    expect(service.throwOneDice(PossibleDice.d4)).toBeGreaterThan(0);
  });

  it('d3 should be < 4', () => {
    expect(service.throwOneDice(PossibleDice.d3)).toBeLessThan(4);
  })

  it('should be less than 5% in 100 000 lauches for d6', () => {
    const NB_TRIES = 100 * 1000;

    for (let i = 0; i < NB_TRIES; i += 1) {
      const actualLauch = service.throwOneDice(PossibleDice.d6);
      for (let dice of launchesForD6) {
        if (dice.value === actualLauch) {
          dice.nb += 1;
        }
      }
    }

    let min = NB_TRIES;
    let max = 0;
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
      const value = service.throwDices(3, PossibleDice.d6, 12);
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
      const value = service.throwDicesForStatistic();
      if (value > max) max = value;
      if (value < min) min = value;
    }
    expect(max).toBeLessThanOrEqual(18);
    expect(min).toBeLessThanOrEqual(18);
    expect(max).toBeGreaterThanOrEqual(3);
    expect(min).toBeGreaterThanOrEqual(3);
  });

  it('sould recognize d3', () => {
    expect(service.transformStringToDice("d3")).toBe(PossibleDice.d3);
  });
  it('sould recognize d4', () => {
    expect(service.transformStringToDice("d4")).toBe(PossibleDice.d4);
  });
  it('sould recognize d6', () => {
    expect(service.transformStringToDice("d6")).toBe(PossibleDice.d6);
  });
  it('sould recognize d8', () => {
    expect(service.transformStringToDice("d8")).toBe(PossibleDice.d8);
  });
  it('sould recognize d10', () => {
    expect(service.transformStringToDice("d10")).toBe(PossibleDice.d10);
  });
  it('sould recognize d12', () => {
    expect(service.transformStringToDice("d12")).toBe(PossibleDice.d12);
  });
  it('sould recognize d20', () => {
    expect(service.transformStringToDice("d20")).toBe(PossibleDice.d20);
  });
  it('sould throw error', () => {
    expect(() => service.transformStringToDice("plop")).toThrow(new Error("dice not recognized"));
  });
  it('sould throw error', () => {
    expect(() => service.transformStringToDice("d25")).toThrowError("dice not recognized");
  });
});
