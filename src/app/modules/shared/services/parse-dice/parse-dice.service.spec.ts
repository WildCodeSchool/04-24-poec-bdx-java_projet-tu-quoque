import { TestBed } from '@angular/core/testing';

import { ParseDiceService } from './parse-dice.service';
import { PossibleDice } from '../../models/enums/possible-dice.enum';

describe('ParseDiceService', () => {
  let service: ParseDiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParseDiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
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
