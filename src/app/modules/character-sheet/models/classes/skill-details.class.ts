import { Skills } from "../enums/skills.enum";
import { SkillFromDb } from "../types/skill-from-db.type";
import { SkillModifier } from "../types/skill-modifier.type";
import { StatisticDetails } from "./statistic-details.class";

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

    resetRaceValue(): this {
        this.raceValue = 0;
        return this;
    }

    updateRaceValue(skillModifierList: SkillModifier[]): this {
        this.resetRaceValue()
        for (let skillModifier of skillModifierList) {
            if (skillModifier.skill === this.detailsFromDb.name) {
                this.raceValue = skillModifier.mod;
                break;
            }
        }
        return this;
    }

    updateSkillClass(classSkills: Skills[]) {
        this.resetSkillClass();
        if (classSkills.includes(this.detailsFromDb.name)) {
            this.skillClass = true;
        }
        return this;
    }

    resetSkillClass(): this {
        this.skillClass = false;
        return this;
    }

    setStatMod(stats: StatisticDetails[]): this {
        for (let stat of stats) {
            if (this.detailsFromDb.key === stat.abbr && (this.ranks || this.detailsFromDb.innate)) {
                this.statMod = stat.getFinalMod();
                break;
            }
        }
        return this;
    }
}