import { PossibleDiceKey } from "../enums/possible-dice.enum"

export type DiceDeclaration = {
    nbDices: number,
    diceType: PossibleDiceKey,
    modifier: number
}