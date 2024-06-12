import { DestroyRef, inject, Injectable } from '@angular/core';
import { SheetDTO } from '../../models/types/dto/sheet-dto.type';
import { Sheet, SheetKeyForString, SheetKeyForStringKeys } from '../../models/types/sheet.type';
import { CharacterStats } from '../../models/classes/character-stats.class';
import { SkillInfoModifiedByPlayerDTO } from '../../models/types/dto/skill-info-modified-by-player-dto.type';
import { SkillInfosAddByPlayer } from '../classes/skill-infos-add-by-player.class';
import { WeaponDTO } from '../../models/types/dto/weapon-dto.type';
import { Weapon } from '../../models/classes/weapon.class';
import { DbService } from '../../../shared/services/db-service/db.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { WeaponDetails } from '../../models/types/weapons/weapon.type';
import { StatisticsDTO } from '../../models/types/dto/statistics-dto.type';
import { StatisticDetails } from '../../models/classes/statistic-details.class';

@Injectable({
  providedIn: 'root'
})
export class TransformDtoToSheetService {

  private weapons$ = inject(DbService).getWeapons$();
  private destroyRef: DestroyRef = inject(DestroyRef)

  public transform(sheetDTO: SheetDTO): Sheet {
    const sheet: Sheet = this.generateBlankSheet();
    this.transformStringAttributes(sheet, sheetDTO);

    const weapons = [...sheetDTO.weapons.weapons]

    for (let [index, weaponDTO] of weapons.entries()) {
      this.weapons$.pipe(
        takeUntilDestroyed(this.destroyRef),
      ).subscribe((weapons: WeaponDetails[]) => {
        const weaponFound = weapons.find(weapon => weapon.name == weaponDTO.name)
        if (weaponFound) {
          sheet.weapons[index] = new Weapon(weaponFound);
        }
      })
    }

    sheet.stats = this.transformStatistics(sheetDTO.stats);
    //TODO : stats, purse

    return sheet;
  }

  private generateBlankSheet(): Sheet {
    return {
      "skills": [], "weapons": [],
      age: '',
      alignment: '',
      characterClass: '',
      characterName: '',
      characterRace: '',
      eyesColor: '',
      gender: '',
      god: '',
      hairColor: '',
      heightModifierRolled: '',
      level: '',
      playerName: '',
      skinColor: '',
      stats: new CharacterStats,
      weightModifierRolled: ''
    };
  }

  private transformSkillDTOintoSkill(skillDTO: SkillInfoModifiedByPlayerDTO): SkillInfosAddByPlayer {
    return new SkillInfosAddByPlayer(skillDTO.skillId, skillDTO.rankSkill, skillDTO.complement);
  }

  private transformStringAttributes(sheet: Sheet, sheetDTO: SheetDTO) {
    const stringAttributes: SheetKeyForStringKeys[] = [
      "age",
      "alignment",
      "characterClass",
      "characterName",
      "characterRace",
      "eyesColor",
      "gender",
      "god",
      "hairColor",
      "heightModifierRolled",
      "level",
      "playerName",
      "skinColor",
      "weightModifierRolled"];

    const skills = [...sheetDTO.skills]

    skills.forEach((skillDTO: SkillInfoModifiedByPlayerDTO) =>
      this.transformSkillDTOintoSkill(skillDTO)
    );

    stringAttributes.forEach(attribute => {
      if (sheetDTO[attribute] != null) {
        sheet[attribute] = sheetDTO[attribute] as string;
      }
    });
    return sheet;
  }

  transformStatistics(statisticsDTO: StatisticsDTO) {
    const stats = new CharacterStats();
    console.log(statisticsDTO, "from transform service");
    if (!statisticsDTO.FOR.originalValue) return stats;
    for (let stat of stats) {
      stats[stat.abbr].originalValue = statisticsDTO[stat.abbr].originalValue;
      stats[stat.abbr].tempValue = statisticsDTO[stat.abbr].tempModifier;
    }
    stats.resetRaceModifier()
    console.log(stats, "final stats from transform service");
    return stats;
  }

}
