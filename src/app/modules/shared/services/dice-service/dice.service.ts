import { Injectable } from '@angular/core';
import { PossibleDice } from '../../models/enums/possible-dice.enum';

@Injectable({
  providedIn: 'root'
})
export class DiceService {

  constructor() { }

  throwOneDice(nbFaces: PossibleDice): number {
    return Math.ceil(Math.random() * nbFaces);
  }

  throwDices(nbDices: number, nbFaces: PossibleDice, additionnalValue: number = 0): number {
    let sum: number = 0;
    for (let i = 0; i < nbDices; i += 1) {
      sum += this.throwOneDice(nbFaces);
    }
    return sum + additionnalValue;
  }

  throwDicesForStatistic(): number {
    const rolls = [0, 0, 0, 0]
      .map(() => this.throwOneDice(PossibleDice.d6));
    return rolls
      .sort()
      .slice(1)
      .reduce((accum, e) => accum + e, 0);
  }

  transformStringToDice(dice: string): PossibleDice {
    switch (dice) {
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
}
