import { SavingThrowsBaseBonusService } from "../../shared/services/saving-throws-base-bonus.service";
import { SavingThrowsEnum } from "../enums/saving-throw-enum.enum";
import { SavingThrowTypeKey } from "../enums/saving-throws-type.enum";

export class SavingThrow {
    baseValue: number = 0;
    statMod: number = 0;
    totalValue: number = 0;
    name: string = "";
    caracName: string = "";

    constructor(
        public key: SavingThrowsEnum,
    ) {
        this.setName(key);
    }

    setName(key: SavingThrowsEnum) {
        this.caracName = key;
        switch (key) {
            case "DEX":
                this.name = "Réflexes";
                break;
            case "CON":
                this.name = "Vigueur";
                break;
            case "SAG":
                this.name = "Volonté";
                break;
        }
    }

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