import { SkillFromDb } from "../types/skill-from-db.type";

export class SkillDetails {
    private static counter = 0;
    id: number;
    value!: number;
    skillClass: boolean = false;
    raceValue: number = 0;
    ranks: number = 0;
    statMod: number = 0;
    complement: string = "";

    constructor(public detailsFromDb: SkillFromDb) {
        this.id = SkillDetails.counter;
        SkillDetails.counter += 1;
    }

    calcValue() {
        // TODO real calcul
        return this.statMod + (this.ranks || 0) + this.raceValue;
    }
}