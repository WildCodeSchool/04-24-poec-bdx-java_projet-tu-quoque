import { Injectable } from '@angular/core';
import { Sheet } from '../../models/types/sheet.type';
import { CharacterStats } from '../../models/classes/character-stats.class';
import { Purse } from '../../models/classes/purse-related/purse.class';

@Injectable({
  providedIn: 'root'
})
export class BlankSheetGeneratorService {

  public static generate(): Sheet {
    return {
      "skills": [], "weapons": [],
      id: 0,
      statisticsId: -1,
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
}
