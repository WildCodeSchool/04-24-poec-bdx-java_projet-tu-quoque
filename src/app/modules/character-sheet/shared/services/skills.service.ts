import { Injectable } from '@angular/core';
import { map, Observable, shareReplay, switchMap, tap } from "rxjs";
import { DbService } from "../../../shared/services/db-service/db.service";
import { SkillDetails } from '../../models/classes/skill-details.class';
import { SkillFromDb } from '../../models/types/skill-from-db.type';
import { CharacterSheetService } from "../../shared/services/character-sheet.service";
import { Race } from '../../models/types/race.type';
import { CharacterClass } from '../../models/types/character-class.type';
import { CharacterStats } from '../../models/classes/character-stats.class';

@Injectable({
  providedIn: 'root'
})
export class SkillsService {
  skills$!: Observable<SkillDetails[]>;

  constructor(
    private dbService: DbService,
    private sheetService: CharacterSheetService,
  ) {
    console.log("SKILLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL");

    this.init();
  }

  init(): void {
    this.skills$ = this.dbService.getSkills$().pipe(
      map((skillList: SkillFromDb[]) => this.transformSkillFromDbIntoSkillsDetails(skillList)),
      tap(hop => console.log("HOOOOOOOOOPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP")),
      switchMap((skills: SkillDetails[]) => this.sheetService.race$.pipe(
        tap(hop => console.log("HOOOOOOOOOPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP")),
        map((race: Race) => this.updateSkillsWithRace(skills, race)),
        tap(hop => console.log("HOOOOOOOOOPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP")),
      )),
      switchMap((skills: SkillDetails[]) => this.sheetService.getClasseDetails$().pipe(
        tap(hop => console.log("HOOOOOOOOOPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP")),
        map((classDetails: CharacterClass) =>
          this.updateSkillsWithClass(skills, classDetails)
        ),
        tap(hop => console.log("HOOOOOOOOOPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP")),
      )),
      switchMap((skills: SkillDetails[]) => this.sheetService.getCaracteristics$().pipe(
        map((stats: CharacterStats) => this.updateSkillStatMod(skills, stats)),
      )),

      shareReplay(),
    );
  }

  transformSkillFromDbIntoSkillsDetails(skillList: SkillFromDb[]): SkillDetails[] {
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

  updateSkillStatMod(skills: SkillDetails[], stats: CharacterStats): SkillDetails[] {
    if (!stats) return skills;
    if (!stats.FOR.originalValue) return skills;
    for (let skill of skills) {
      skill.setStatMod(stats);
    }
    return skills;
  }
}