import { DestroyRef, inject, Injectable } from '@angular/core';
import { SheetDTO } from '../../models/types/dto/sheet-dto.type';
import { Sheet, SheetKeyForStringKeys } from '../../models/types/sheet.type';
import { CharacterStats } from '../../models/classes/character-stats.class';
import { SkillInfoModifiedByPlayerDTO } from '../../models/types/dto/skill-info-modified-by-player-dto.type';
import { SkillInfosAddByPlayer } from '../classes/skill-infos-add-by-player.class';
import { Weapon } from '../../models/classes/weapon.class';
import { DbService } from '../../../shared/services/db-service/db.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { WeaponDetails } from '../../models/types/weapons/weapon.type';
import { StatisticsDTO } from '../../models/types/dto/statistics-dto.type';
import { Purse } from '../../models/classes/purse-related/purse.class';
import { BlankSheetGeneratorService } from './blank-sheet-generator.service';

@Injectable({
  providedIn: 'root'
})
export class TransformDtoToSheetService {

  private weapons$ = inject(DbService).getWeapons$();
  private destroyRef: DestroyRef = inject(DestroyRef)

  public transform(sheetDTO: SheetDTO): Sheet {
    const sheet: Sheet = BlankSheetGeneratorService.generate();
    this.transformStringAttributes(sheet, sheetDTO);

    sheet.id = sheetDTO.id;
    sheet.statisticsId = sheetDTO.stats.id;
    sheet.purseId = sheetDTO.purse.id;

    const weapons = [...sheetDTO.weapons.weapons]

    for (let [index, weaponDTO] of weapons.entries()) {
      this.weapons$.pipe(
        takeUntilDestroyed(this.destroyRef),
      ).subscribe((weapons: WeaponDetails[]) => {
        const weaponFound = weapons.find(weapon => weapon.name == weaponDTO.name)
        if (weaponFound) {
          sheet.weapons[index] = new Weapon(weaponFound, weaponDTO.id);
        }
      })
    }

    sheet.stats = this.transformStatistics(sheetDTO.stats);

    sheet.purse = Purse.purseFromPurseDTO(sheetDTO.purse);

    sheet.weaponsId = sheetDTO.weapons.id;

    return sheet;
  }

  private transformSkillDTOintoSkill(skillDTO: SkillInfoModifiedByPlayerDTO): SkillInfosAddByPlayer {
    return new SkillInfosAddByPlayer(skillDTO.skillId, skillDTO.rankSkill, skillDTO.complement, skillDTO.id);
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
    if (!statisticsDTO.FOR.originalValue) return stats;
    for (let stat of stats) {
      stats[stat.abbr].originalValue = statisticsDTO[stat.abbr].originalValue;
      stats[stat.abbr].setStatTempValue(statisticsDTO[stat.abbr].tempValue);
      stats[stat.abbr].id = statisticsDTO[stat.abbr].id;
    }
    stats.resetRaceModifier()
    return stats;
  }

}
