import { ParseDiceService } from './parse-dice.service';
import { DiceDeclaration } from '../../models/types/dice-declaration.type';

describe('ParseDiceService', () => {


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
      diceType: "d6",
      modifier: 0
    };
    expect(ParseDiceService.parseDiceDeclaration("2d6")).toEqual(dice);
  });

  it('should parse 1d8+5', () => {
    const dice: DiceDeclaration = {
      nbDices: 1,
      diceType: "d8",
      modifier: 5
    };
    expect(ParseDiceService.parseDiceDeclaration("1D8+5")).toEqual(dice);
  });

  it('should parse d20', () => {
    const dice: DiceDeclaration = {
      nbDices: 1,
      diceType: "d20",
      modifier: 0
    };
    expect(ParseDiceService.parseDiceDeclaration("d20")).toEqual(dice);
  });
  it('should parse 2d12-2', () => {
    const dice: DiceDeclaration = {
      nbDices: 2,
      diceType: "d12",
      modifier: -2
    };
    expect(ParseDiceService.parseDiceDeclaration("2d12-2")).toEqual(dice);
  });

  it("should throw Error on parsing 2d6d6", () => {
    expect(() => ParseDiceService.parseDiceDeclaration("2d6d6")).toThrowError("Dice isn't valuable");
  });
});
