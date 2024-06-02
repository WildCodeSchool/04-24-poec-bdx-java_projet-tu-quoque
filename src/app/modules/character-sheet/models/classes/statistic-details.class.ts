import { DiceService } from "../../../shared/services/dice-service/dice.service";
import { StatAbbr, StatAbbrKey, StatAbbrValue } from "../enums/stats-abbr.enum";
import { StatModifier } from "../types/stat-modifier.type";

export class StatisticDetails {
    abbr: StatAbbrKey;
    originalValue!: number;
    value!: number;
    name: StatAbbrValue;
    mod!: number;
    tempValue!: number;
    tempMod!: number;

    constructor(abbr: StatAbbrKey) {
        this.abbr = abbr;
        this.name = StatAbbr[this.abbr]
        this.value = DiceService.throwDicesForStatistic();
        this.originalValue = this.value;
        this.mod = this.calcMod();
    }

    calcMod(statValue: number = this.value): number {
        return Math.floor((statValue - 10) / 2);
    }

    setMod(): void {
        this.mod = this.calcMod();
    }

    setStatTempValue(value: number): void {
        this.tempValue = value;
        if (value) this.tempMod = this.calcMod(this.tempValue);
        else this.tempMod = 0;
    }

    getFinalMod(): number {
        if (this.tempValue) {
            return this.tempMod;
        }
        return this.mod;
    }

    applyModifier(modifier: StatModifier): void {
        this.value = this.originalValue;
        this.value += modifier.mod;
        this.setMod();
    }
}