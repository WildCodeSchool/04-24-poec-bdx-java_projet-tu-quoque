export enum PossibleDice {
    d3 = 3,
    d4 = 4,
    d6 = 6,
    d8 = 8,
    d10 = 10,
    d12 = 12,
    d20 = 20
}

export type PossibleDiceKey = keyof typeof PossibleDice;
export type PossibleDiceValue = typeof PossibleDice[PossibleDiceKey];