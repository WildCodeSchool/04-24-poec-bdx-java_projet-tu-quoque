import { Injectable } from '@angular/core';
import { Sheet } from '../../models/types/sheet.type';
import { CharacterStats } from '../../models/classes/character-stats.class';
import { Purse } from '../../models/classes/purse-related/purse.class';
import { SheetDTOFromFrontToBack } from '../../models/types/dto/dto-from-front/sheet-dto-from-front-to-back.type';
import { StatisticsDTO } from '../../models/types/dto/statistics-dto.type';
import { StatisticDTO } from '../../models/types/dto/statistic-dto.type';
import { PurseDTO } from '../../models/types/dto/purse-dto.type';

@Injectable({
  providedIn: 'root'
})
export class BlankSheetGeneratorService {

  public static generate(): Sheet {
    return {
      "skills": [], "weapons": [],
      id: 0,
      statisticsId: -1,
      weaponsId: -1,
      purseId: -1,
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
      stats: new CharacterStats(),
      weightModifierRolled: '',
      purse: new Purse()
    };
  }

  public static generateBlankSheetFromFront(): SheetDTOFromFrontToBack {
    return {
      id: 0,
      statisticsId: -1,
      weaponsId: -1,
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
      stats: this.generateBlankStatisticsDTO(),
      weightModifierRolled: '',
      purse: (new Purse()).transformInPurseDTO(),
      skills: [],
      weapons: [],
    }
  }

  private static generateBlankStatisticsDTO(): StatisticsDTO {
    return {
      id: -1,
      FOR: this.generateBlankStatisticDTO("FOR"),
      DEX: this.generateBlankStatisticDTO("DEX"),
      CON: this.generateBlankStatisticDTO("CON"),
      INT: this.generateBlankStatisticDTO("INT"),
      SAG: this.generateBlankStatisticDTO("SAG"),
      CHA: this.generateBlankStatisticDTO("CHA"),
    }
  }

  private static generateBlankStatisticDTO(abbreviation: string): StatisticDTO {
    return {
      abbr: abbreviation,
      id: -1,
      originalValue: -1,
      tempValue: -1
    }
  }
}
