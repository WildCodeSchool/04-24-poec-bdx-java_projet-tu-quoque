import { Component, DestroyRef, inject, Input, OnInit } from '@angular/core';
import { WeaponDetails } from '../../../../models/types/weapons/weapon.type';
import { CharacterWeaponsService } from '../../../../shared/services/market/character-weapons.service';
import { Weapon } from '../../../../models/classes/weapon.class';
import { map, Observable, switchMap } from 'rxjs';
import { SizeCategoryEnumKey } from '../../../../models/enums/sizeCategoryEnum.enum';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-attack',
  templateUrl: './attack.component.html',
  styleUrl: './attack.component.scss'
})
export class AttackComponent implements OnInit {
  @Input()
  weapon!: Weapon;
  @Input()
  index!: number;
  @Input()
  characterSize$!: Observable<SizeCategoryEnumKey>;
  @Input()
  baseAttackBonus$!: Observable<number[]>;
  @Input()
  strengthBonus$!: Observable<number>;
  @Input()
  dexterityBonus$!: Observable<number>;

  strengthBonus!: number;
  dexterityBonus!: number;
  baseAttackBonus: string = "";

  weaponService: CharacterWeaponsService = inject(CharacterWeaponsService);
  destroyRef: DestroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.getStrength();
    this.getDexterity();
  }

  getStrength() {
    this.strengthBonus$.pipe(
      takeUntilDestroyed(this.destroyRef),
    ).subscribe((value: number) => this.strengthBonus = value);
  }

  getDexterity() {
    this.dexterityBonus$.pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe((value: number) => this.dexterityBonus = value);
  }

  purchaseWeapon(weapon: WeaponDetails): void {
    this.weapon = new Weapon(weapon);
    this.weaponService.acquiereWeapon(this.weapon, this.index);
  }

  getBaseAttackBonus(stat: number): Observable<string> {
    return this.baseAttackBonus$.pipe(
      map((value: number[]) => this.baseAttackBonus = this.transformAttackBaseBonusModifiedByStatToString(value, stat))
    )
  }

  transformAttackBaseBonusModifiedByStatToString(baseAttackBonus: number[], stat: number): string {
    if (baseAttackBonus.includes(NaN)) return "";
    let result: string = '';
    for (let [index, attack] of baseAttackBonus.entries()) {
      let bonus: number = attack + stat;
      result += bonus > 0 ? " +" : '';
      result += bonus;
      if (index != baseAttackBonus.length - 1) result += '/';
    }
    return result;
  }
}
