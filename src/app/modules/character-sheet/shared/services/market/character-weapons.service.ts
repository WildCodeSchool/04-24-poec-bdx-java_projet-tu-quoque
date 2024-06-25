import { inject, Injectable } from '@angular/core';
import { CharacterSheetService } from '../character-sheet.service';
import { Weapon } from '../../../models/classes/weapon.class';
import { Subject } from 'rxjs';
import { WeaponField } from '../../models/types/weapon-field.type';
import { ListenPlayerActionService } from '../listen-player-action.service';

@Injectable({
  providedIn: 'root'
})
export class CharacterWeaponsService {
  sheetService: CharacterSheetService = inject(CharacterSheetService);
  listener: ListenPlayerActionService = inject(ListenPlayerActionService);
  weaponField$: Subject<WeaponField> = new Subject();
  weapons: Weapon[] = [];

  constructor() {
    this.listener.receiveFieldFrom(this.weaponField$.asObservable());
  }

  acquiereWeapon(weapon: Weapon, weaponIndex: number): void {
    this.weapons[weaponIndex] = weapon;
    this.weaponField$.next({
      index: weaponIndex,
      value: weapon
    });
  }
}
