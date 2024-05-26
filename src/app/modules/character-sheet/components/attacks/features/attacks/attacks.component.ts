import { Component, inject } from '@angular/core';
import { ClassWeaponsService } from '../../../../shared/services/class-weapons.service';
import { WeaponDetails } from '../../../../models/types/weapons/weapon.type';
import { Weapon } from '../../../../models/classes/weapon.class';
import { CharacterSheetService } from '../../../../shared/services/character-sheet.service';

@Component({
  selector: 'app-attacks',
  templateUrl: './attacks.component.html',
  styleUrl: './attacks.component.scss'
})
export class AttacksComponent {
  weapons: Weapon[] = [];
  characterSize$ = inject(CharacterSheetService).setSizeCategory$()
  classWeapons$ = inject(ClassWeaponsService).getClassWeapons$();
}
