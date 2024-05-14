import { map, Observable, shareReplay, switchMap, tap } from "rxjs";
import { DbService } from "../../../shared/services/db-service/db.service";
import { SkillDetails } from "./skill-details.class";
import { SkillFromDb } from "../types/skill-from-db.type";
import { CharacterSheetService } from "../../shared/services/character-sheet.service";
import { Race } from "../types/race.type";
import { CharacterClass } from "../types/character-class.type";
import { StatisticDetails } from "./statistic-details.class";

export class CharacterSkills {
    skills$!: Observable<any>;

    constructor(
        private dbService: DbService,
        private sheetService: CharacterSheetService,
    ) {
        this.init();
    }

    init() {
        this.skills$ = this.dbService.getSkills$().pipe(
            map((skillList: SkillFromDb[]) => {
                const skills: SkillDetails[] = [];
                skillList.forEach((skillFromDb: SkillFromDb) => skills.push(new SkillDetails(skillFromDb)));
                return skills;
            }),
            shareReplay(),
            switchMap((skills: SkillDetails[]) => this.sheetService.race$.pipe(
                map((race: Race) => {
                    if (!race) return skills.map((skill) => {
                        skill.raceValue = 0;
                        return skill;
                    });
                    for (let skill of skills) {
                        let changed = false;
                        for (let skillModifier of race.skills) {
                            if (skillModifier.skill === skill.detailsFromDb.name) {
                                skill.raceValue = skillModifier.mod;
                                changed = true;
                                break;
                            }
                        }
                        if (!changed) skill.raceValue = 0;
                    }
                    return skills;
                })
            )),
            switchMap((skills: SkillDetails[]) => this.sheetService.getClasseDetails$().pipe(
                map((classDetails: CharacterClass) => {
                    if (!classDetails) return skills;
                    if (classDetails.classSkills.length === 0) return skills;
                    for (let skill of skills) {
                        let changed = false;
                        for (let classSkill of classDetails.classSkills) {
                            if (skill.detailsFromDb.name === classSkill) {
                                skill.skillClass = true;
                                changed = true;
                                break;
                            }
                        }
                        if (!changed) skill.skillClass = false;
                    }
                    return skills;
                })
            )),
            switchMap((skills: SkillDetails[]) => this.sheetService.getCaracteristics$().pipe(
                map((stats: StatisticDetails[]) => {
                    if (!stats) return skills;
                    for (let skill of skills) {
                        for (let stat of stats) {
                            if (skill.detailsFromDb.key === stat.abbr && (skill.ranks || skill.detailsFromDb.innate)) {
                                skill.statMod = stat.getFinalMod();
                                break;
                            }
                        }
                    }
                    return skills;
                })
            ))
        );
    }
}