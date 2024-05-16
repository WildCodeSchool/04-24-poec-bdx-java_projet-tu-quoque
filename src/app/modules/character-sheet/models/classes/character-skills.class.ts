import { map, Observable, shareReplay, switchMap } from "rxjs";
import { DbService } from "../../../shared/services/db-service/db.service";
import { SkillDetails } from "./skill-details.class";
import { SkillFromDb } from "../types/skill-from-db.type";
import { CharacterSheetService } from "../../shared/services/character-sheet.service";
import { Race } from "../types/race.type";
import { CharacterClass } from "../types/character-class.type";
import { StatisticDetails } from "./statistic-details.class";

export class CharacterSkills {
    skills$!: Observable<SkillDetails[]>;

    constructor(
        private dbService: DbService,
        private sheetService: CharacterSheetService,
    ) {
        this.init();
    }

    init() {
        this.skills$ = this.dbService.getSkills$().pipe(
            map((skillList: SkillFromDb[]) => this.transformSkillFromDbIntoSkillsDetails(skillList)),
            shareReplay(),
            switchMap((skills: SkillDetails[]) => this.sheetService.race$.pipe(
                map((race: Race) => this.updateSkillsWithRace(skills, race))
            )),
            switchMap((skills: SkillDetails[]) => this.sheetService.getClasseDetails$().pipe(
                map((classDetails: CharacterClass) =>
                    this.updateSkillsWithClass(skills, classDetails)
                )
            )),
            switchMap((skills: SkillDetails[]) => this.sheetService.getCaracteristics$().pipe(
                map((stats: StatisticDetails[]) => this.updateSkillStatMod(skills, stats)),
            ))
        );
    }

    transformSkillFromDbIntoSkillsDetails(skillList: SkillFromDb[]) {
        const skills: SkillDetails[] = [];
        skillList.forEach((skillFromDb: SkillFromDb) => skills.push(new SkillDetails(skillFromDb)));
        return skills;
    }

    updateSkillsWithRace(skills: SkillDetails[], race: Race): SkillDetails[] {
        if (!race) return skills.map((skill) => skill.resetRaceValue());
        for (let skill of skills) {
            skill.updateRaceValue(race.skills);
        }
        return skills;
    }

    updateSkillsWithClass(skills: SkillDetails[], classDetails: CharacterClass): SkillDetails[] {
        if (!classDetails || !classDetails.classSkills.length) return skills.map(skill => skill.resetSkillClass());
        for (let skill of skills) {
            skill.updateSkillClass(classDetails.classSkills);
        }
        return skills;
    }

    updateSkillStatMod(skills: SkillDetails[], stats: StatisticDetails[]) {
        if (!stats) return skills;
        for (let skill of skills) {
            skill.setStatMod(stats);
        }
        return skills;
    }
}