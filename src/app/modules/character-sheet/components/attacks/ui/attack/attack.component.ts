import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { WeaponDetails } from '../../../../models/types/weapons/weapon.type';
import { CharacterWeaponsService } from '../../../../shared/services/character-weapons.service';
import { Weapon } from '../../../../models/classes/weapon.class';
import { Observable } from 'rxjs';
import { SizeCategoryEnumKey } from '../../../../models/enums/sizeCategoryEnum.enum';

@Component({
  selector: 'app-attack',
  templateUrl: './attack.component.html',
  styleUrl: './attack.component.scss'
})
export class AttackComponent {
  @Input()
  weapon!: Weapon;
  @Input()
  index!: number;
  @Input()
  characterSize$!: Observable<SizeCategoryEnumKey>;

  weaponService: CharacterWeaponsService = inject(CharacterWeaponsService);

  purchaseWeapon(weapon: WeaponDetails) {
    this.weapon = new Weapon(weapon);
    //TODO: save weapon in weapon service
  }
}
