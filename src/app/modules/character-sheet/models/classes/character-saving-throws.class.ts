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
    }

    public toString() {
        return `level : ${this.level}`;
    }

    public updateSavingThrows() {
        this.fortitude.setBaseValue(this.level, this.classSavingThrows.fortitude);
        this.reflexes.setBaseValue(this.level, this.classSavingThrows.reflexes);
        this.will.setBaseValue(this.level, this.classSavingThrows.will);
    }

}