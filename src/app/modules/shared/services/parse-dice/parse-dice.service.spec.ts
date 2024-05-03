import { TestBed } from '@angular/core/testing';

import { ParseDiceService } from './parse-dice.service';
import { PossibleDice } from '../../models/enums/possible-dice.enum';
import { DiceDeclaration } from '../../models/types/dice-declaration.type';

describe('ParseDiceService', () => {

  it('should recognize d3', () => {
    expect(ParseDiceService.transformStringToDice("d3")).toBe(PossibleDice.d3);
  });
  it('should recognize d4', () => {
    expect(ParseDiceService.transformStringToDice("d4")).toBe(PossibleDice.d4);
  });
  it('should recognize d6', () => {
    expect(ParseDiceService.transformStringToDice("d6")).toBe(PossibleDice.d6);
  });
  it('should recognize d8', () => {
    expect(ParseDiceService.transformStringToDice("d8")).toBe(PossibleDice.d8);
  });
  it('should recognize d10', () => {
    expect(ParseDiceService.transformStringToDice("d10")).toBe(PossibleDice.d10);
  });
  it('should recognize d12', () => {
    expect(ParseDiceService.transformStringToDice("d12")).toBe(PossibleDice.d12);
  });
  it('should recognize d20', () => {
    expect(ParseDiceService.transformStringToDice("d20")).toBe(PossibleDice.d20);
  });
  it('should throw error', () => {
    expect(() => ParseDiceService.transformStringToDice("plop")).toThrow(new Error("dice not recognized"));
  });
  it('should throw error', () => {
    expect(() => ParseDiceService.transformStringToDice("d25")).toThrowError("dice not recognized");
  });

  it('should recognize 2d6', () => {
    expect(ParseDiceService.isValidDiceDeclaration("2d6")).toBe(true);
  });
  it('should recognize 2d6+12', () => {
    expect(ParseDiceService.isValidDiceDeclaration("2d6+12")).toBe(true);
  });
  it('should recognize 1d8+5', () => {
    expect(ParseDiceService.isValidDiceDeclaration("1d8+5")).toBe(true);
  });
  it('should recognize 2d20-1', () => {
    expect(ParseDiceService.isValidDiceDeclaration("2d20-1")).toBe(true);
  });
  it('should recognize d6', () => {
    expect(ParseDiceService.isValidDiceDeclaration("d6")).toBe(true);
  });
  it('should not recognize an empty string', () => {
    expect(ParseDiceService.isValidDiceDeclaration("")).toBe(false);
  });
  it('should not recognize plam', () => {
    expect(ParseDiceService.isValidDiceDeclaration("plam")).toBe(false);
  });
  it('should not recognize 2', () => {
    expect(ParseDiceService.isValidDiceDeclaration("2")).toBe(false);
  });


  it('should parse 2d6', () => {
    const dice: DiceDeclaration = {
      nbDices: 2,
      diceType: PossibleDice.d6,
      modifier: 0
    };
    expect(ParseDiceService.parseDiceDeclaration("2d6")).toEqual(dice);
  });

  it('should parse 1d8+5', () => {
    const dice: DiceDeclaration = {
      nbDices: 1,
      diceType: PossibleDice.d8,
      modifier: 5
    };
    expect(ParseDiceService.parseDiceDeclaration("1D8+5")).toEqual(dice);
  });

  it('should parse d20', () => {
    const dice: DiceDeclaration = {
      nbDices: 1,
      diceType: PossibleDice.d20,
      modifier: 0
    };
    expect(ParseDiceService.parseDiceDeclaration("d20")).toEqual(dice);
  });
  it('should parse 2d12-2', () => {
    const dice: DiceDeclaration = {
      nbDices: 2,
      diceType: PossibleDice.d12,
      modifier: -2
    };
    expect(ParseDiceService.parseDiceDeclaration("2d12-2")).toEqual(dice);
  });

  it("should throw Error on parsing 2d6d6", () => {
    expect(() => ParseDiceService.parseDiceDeclaration("2d6d6")).toThrowError("Dice isn't valuable");
  });
});
