import { Injectable } from '@angular/core';
import { PossibleDice } from '../../models/enums/possible-dice.enum';
import { DiceDeclaration } from '../../models/types/dice-declaration.type';

@Injectable({
  providedIn: 'root'
})
export class ParseDiceService {

  static transformStringToDice(dice: string): PossibleDice {
    switch (dice.trim()) {
      case "d3":
        return PossibleDice.d3;
      case "d4":
        return PossibleDice.d4;
      case "d6":
        return PossibleDice.d6;
      case "d8":
        return PossibleDice.d8;
      case "d10":
        return PossibleDice.d10;
      case "d12":
        return PossibleDice.d12;
      case "d20":
        return PossibleDice.d20;
      default:
        throw new Error("dice not recognized");
    }
  }

  static parseDiceDeclaration(diceDeclarationString: string): DiceDeclaration {
    if (!this.isValidDiceDeclaration(diceDeclarationString)) {
      throw new Error("Dice isn't valuable");
    }
    diceDeclarationString = diceDeclarationString.toLowerCase();
    if (diceDeclarationString.startsWith("d")) {
      diceDeclarationString = "1" + diceDeclarationString;
    }
    const arr = diceDeclarationString.split("d")
    if (arr.length > 2) {
      throw new Error("Dice isn't valuable");
    }
    const nbDices = arr.splice(0, 1);
    const restOfDeclaration = arr[0];
    const modOperation = this.getModOperation(diceDeclarationString);

    return this.extractDiceDeclaration(nbDices, restOfDeclaration, modOperation)
  }

  static isValidDiceDeclaration(diceDeclaration: string): boolean {
    diceDeclaration += " ";
    const regexDices = /(\d+)?d(\d+)([\+\-]\d+)?/i;
    const res = diceDeclaration.match(regexDices);

    return res !== null;
  }

  private static extractDiceDeclaration(nbDices: string[], restOfDeclaration: string, modOperation: string): DiceDeclaration {
    let diceType: string;
    let modifier: string = "0";
    if (modOperation.length == 0) {
      diceType = restOfDeclaration;
    } else {
      [diceType, modifier] = restOfDeclaration.split(modOperation);
    }

    const diceDeclaration: DiceDeclaration = {
      nbDices: Number(nbDices),
      diceType: this.transformStringToDice(`d${diceType}`),
      modifier: Number(modOperation + modifier)
    };
    return diceDeclaration;
  }

  private static getModOperation(declaration: string): string {
    let modOperation = "";
    if (declaration.includes("+")) {
      modOperation = "+";
    } else if (declaration.includes("-")) {
      modOperation = "-";
    }
    return modOperation;
  }
}
