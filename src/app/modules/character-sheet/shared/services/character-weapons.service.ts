import { inject, Injectable } from '@angular/core';
import { CharacterSheetService } from './character-sheet.service';
import { Weapon } from '../../models/classes/weapon.class';

@Injectable({
  providedIn: 'root'
})
export class CharacterWeaponsService {
  sheetService: CharacterSheetService = inject(CharacterSheetService);

  weapons: Weapon[] = [];

  constructor() { }

  purchaseWeapon(weapon: Weapon, index: number) {
    this.weapons[index] = weapon;
  }
}
