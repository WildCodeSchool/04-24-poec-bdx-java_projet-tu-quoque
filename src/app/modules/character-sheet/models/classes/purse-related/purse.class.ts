import { PurseCoinIndex } from "./purse-coin-index.class";

export class Purse {
    gold: number = 0;
    silver: number = 0;
    copper: number = 0;

    constructor(amountInString: string = "") {
        [this.gold, this.silver, this.copper] = this.convert(amountInString);
    }

    gain(amount: string): void {
        const newPurse = new Purse(amount);
        this.gold += newPurse.gold;
        this.silver += newPurse.silver;
        this.copper += newPurse.copper;
        this.reorganize();
    }

    debt(amount: string): void {
        const newPurse = new Purse(amount);
        if (newPurse > this) throw new Error('Transaction impossible');
        this.gold -= newPurse.gold;
        this.silver -= newPurse.silver;
        this.copper -= newPurse.copper;
        this.reorganize();
    }

    private reorganize(): void {
        let total: number = this.valueOf();
        [this.copper, this.silver] = [total % 100, Math.floor(total / 100)];
        [this.silver, this.gold] = [this.silver % 100, Math.floor(this.silver / 100)];
    }

    convert(amount: string): number[] {
        if (amount === "") return [0, 0, 0];
        amount = amount.replace(/[,\s]/g, '').toLowerCase();
        const coinsIndexes = this.getCoinsIndexes(amount);
        const numbersFound = amount.match(/\d+/g);
        this.verifyAmountValidity(numbersFound, coinsIndexes);
        return this.reorderCoins(numbersFound as RegExpMatchArray, coinsIndexes)
    }

    private getCoinsIndexes(amount: string): PurseCoinIndex[] {
        const coinsIndexes = [
            new PurseCoinIndex("po", 0, amount.indexOf('po')),
            new PurseCoinIndex("pa", 1, amount.indexOf('pa')),
            new PurseCoinIndex("pc", 2, amount.indexOf('pc'))
        ];
        coinsIndexes.sort((a, b) => a.position - b.position);
        return coinsIndexes;
    }

    private verifyAmountValidity(numbersFound: RegExpMatchArray | null, coinsIndexes: PurseCoinIndex[]): void {
        if ((!numbersFound) || coinsIndexes.every(value => value.position == -1))
            throw new Error('le montant ne correspond pas à une chaîne valide');
    }

    private reorderCoins(numbersFound: RegExpMatchArray, coinsIndexes: PurseCoinIndex[]): number[] {
        const coins: number[] = [];
        let modIndex: number = 0;
        for (const [index, coinOrder] of coinsIndexes.entries()) {
            if (coinOrder.position == -1) {
                coins[coinOrder.finalIndex] = 0;
                modIndex += 1;
            } else coins[coinOrder.finalIndex] = +(numbersFound)[index - modIndex];
        }
        return coins;
    }

    public toString(): string {
        let stringValue = this.gold ? `${this.gold}po ` : '';
        stringValue += this.silver ? `${this.silver}pa ` : '';
        stringValue += this.copper ? `${this.copper}pc` : '';
        return stringValue.trim();
    }

    public valueOf(): number {
        return this.gold * 100 * 100 + this.silver * 100 + this.copper;
    }
}