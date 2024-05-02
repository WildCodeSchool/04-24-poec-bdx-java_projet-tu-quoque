import { Injectable } from '@angular/core';
import { PossibleDice } from '../../models/enums/possible-dice.enum';

@Injectable({
  providedIn: 'root'
})
export class ParseDiceService {

  constructor() { }

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
