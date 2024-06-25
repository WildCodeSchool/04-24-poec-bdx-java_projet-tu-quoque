import { Injectable, inject } from '@angular/core';
import { PossibleDice, PossibleDiceKey } from '../../models/enums/possible-dice.enum';
import { ParseDiceService } from '../parse-dice/parse-dice.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { InfoPopupComponent } from '../../../user/modules/table/modules/table-management/modules/table-calendar/components/info-popup/info-popup.component';

@Injectable({
  providedIn: 'root'
})
export class DiceService {

  static throwOneDice(nbFaces: PossibleDiceKey): number {
    return Math.ceil(Math.random() * PossibleDice[nbFaces]);
  }

  static throwDices(nbDices: number, nbFaces: PossibleDiceKey, additionnalValue: number = 0): number {
    let sum: number = 0;
    for (let i = 0; i < nbDices; i += 1) {
      sum += this.throwOneDice(nbFaces);
    }
    return sum + additionnalValue;
  }

  static throwDicesForStatistic(): number {
    const rolls = [0, 0, 0, 0]
      .map(() => this.throwOneDice("d6"));
    return rolls
      .sort()
      .slice(1)
      .reduce((accum, e) => accum + e, 0);
  }

  static roll(dice: string): number {
    const dices = ParseDiceService.parseDiceDeclaration(dice);
    return this.throwDices(dices.nbDices, dices.diceType, dices.modifier);
  }

  public getDicesThrowResult(dicesArray: any): number {
    let totalPoints: number = 0;
    for(let dice of dicesArray) {
      totalPoints += dice.value
    } 
    return totalPoints
  }
}
