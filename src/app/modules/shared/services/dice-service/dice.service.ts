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
}
