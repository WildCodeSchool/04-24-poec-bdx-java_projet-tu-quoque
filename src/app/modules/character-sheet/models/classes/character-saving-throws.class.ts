import { SavingThrow } from "./saving-throw.class";
import { SavingThrowsEnum } from "../enums/saving-throw-enum.enum";
import { SavingThrows } from "../types/saving-throws.type";

export class CharacterSavingThrows {
    public level: number = 0;
    classSavingThrows!: SavingThrows;
    fortitude: SavingThrow = new SavingThrow(SavingThrowsEnum.fortitude);
    reflexes: SavingThrow = new SavingThrow(SavingThrowsEnum.reflexes);
    will: SavingThrow = new SavingThrow(SavingThrowsEnum.will)

    constructor() { }

    public setLevel(level: number) {
        if (level) this.level = level;
        else this.level = 0;
    }

    public toString() {
        return `level : ${this.level}`;
    }

    public updateSavingThrows(): void {
        this.fortitude.setBaseValue(this.level, this.classSavingThrows.fortitude);
        this.reflexes.setBaseValue(this.level, this.classSavingThrows.reflexes);
        this.will.setBaseValue(this.level, this.classSavingThrows.will);
    }

    updateModValues(fortitudeMod: number, reflexesMod: number, willMod: number): void {
        this.fortitude.setStatMod(fortitudeMod);
        this.reflexes.setStatMod(reflexesMod);
        this.will.setStatMod(willMod);
    }
}