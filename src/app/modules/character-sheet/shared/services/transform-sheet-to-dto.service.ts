import { Injectable } from '@angular/core';
import { Sheet, SheetKeyForStringKeys } from '../../models/types/sheet.type';
import { SheetDTOFromFrontToBack } from '../../models/types/dto/dto-from-front/sheet-dto-from-front-to-back.type';
import { BlankSheetGeneratorService } from './blank-sheet-generator.service';
import { CharacterStats } from '../../models/classes/character-stats.class';
import { Weapon } from '../../models/classes/weapon.class';

@Injectable({
  providedIn: 'root'
})
export class TransformSheetToDtoService {

  public transform(originalSheet: Sheet): SheetDTOFromFrontToBack {
    const sheetDTO: SheetDTOFromFrontToBack = BlankSheetGeneratorService.generateBlankSheetFromFront();
    sheetDTO.id = originalSheet.id;
    sheetDTO.statisticsId = originalSheet.statisticsId;
    sheetDTO.weaponsId = originalSheet.weaponsId;
    this.transformStringAttributes(originalSheet, sheetDTO);
    sheetDTO.skills = originalSheet.skills;
    sheetDTO.purse = originalSheet.purse.transformInPurseDTO();
    sheetDTO.purse.id = originalSheet.purseId;
    this.transformStatsToDTO(originalSheet.stats, sheetDTO);

    this.transformWeapons(originalSheet.weapons, sheetDTO);


    return sheetDTO;
  }

  private transformStringAttributes(sheet: Sheet, sheetDTO: SheetDTOFromFrontToBack) {
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

    stringAttributes.forEach(attribute => {
      if (sheet[attribute] != null) {
        sheetDTO[attribute] = sheet[attribute] as string;
      }
    });
    return sheetDTO;
  }

  private transformStatsToDTO(stats: CharacterStats, sheetDTO: SheetDTOFromFrontToBack) {
    for (let statisticDetails of stats) {
      sheetDTO.stats[statisticDetails.abbr] = {
        abbr: statisticDetails.abbr,
        id: statisticDetails.id,
        originalValue: statisticDetails.originalValue,
        tempValue: statisticDetails.tempValue
      }
    }
  }

  private transformWeapons(weapons: Weapon[], sheetDTO: SheetDTOFromFrontToBack) {
    for (let weapon of weapons) {
      sheetDTO.weapons.push({
        id: weapon.id,
        name: weapon.weaponDetails.name
      })
    }
  }
}
