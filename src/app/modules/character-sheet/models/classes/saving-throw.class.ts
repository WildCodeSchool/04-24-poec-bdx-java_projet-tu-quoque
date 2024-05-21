import { SavingThrowsBaseBonusService } from "../../shared/services/saving-throws-base-bonus.service";
import { SavingThrowsEnum } from "../enums/saving-throw-enum.enum";
import { SavingThrowTypeKey } from "../enums/saving-throws-type.enum";

export class SavingThrow {
    private baseValue: number = 0;
    private statMod: number = 0;
    private totalValue: number = 0;
    constructor(
        public key: SavingThrowsEnum,
    ) { }

    setTotalValue(): void {
        this.totalValue = this.baseValue + this.statMod;
    }

    setBaseValue(level: number, classSavingThrowsType: SavingThrowTypeKey): void {
        this.baseValue = SavingThrowsBaseBonusService.getValue(level, classSavingThrowsType);
        this.setTotalValue();
    }

    setStatMod(value: number): void {
        this.statMod = value;
        this.setTotalValue();
    }

    toString(): string {
        return `${this.totalValue} = ${this.baseValue} + ${this.statMod}`;
    }
}