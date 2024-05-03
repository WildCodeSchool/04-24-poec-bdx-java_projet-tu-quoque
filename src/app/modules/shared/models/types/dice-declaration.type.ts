import { PossibleDice } from "../enums/possible-dice.enum"

export type DiceDeclaration = {
    nbDices: number,
    diceType: PossibleDice,
    modifier: number
}