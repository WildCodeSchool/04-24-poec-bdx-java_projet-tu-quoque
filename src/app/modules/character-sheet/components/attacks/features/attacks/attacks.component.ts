import { Component, inject, OnInit } from '@angular/core';
import { ClassWeaponsService } from '../../../../shared/services/class-weapons.service';
import { WeaponDetails } from '../../../../models/types/weapons/weapon.type';
import { Weapon } from '../../../../models/classes/weapon.class';
import { CharacterSheetService } from '../../../../shared/services/character-sheet.service';
import { map, Observable } from 'rxjs';
import { CharacterStats } from '../../../../models/classes/character-stats.class';
import { BaseAttackBonusStreamService } from '../../../../shared/services/base-attack-bonus/base-attack-bonus-stream.service';

@Component({
  selector: 'app-attacks',
  templateUrl: './attacks.component.html',
  styleUrl: './attacks.component.scss'
})
export class AttacksComponent implements OnInit {
  weapons: Weapon[] = [];
  characterSize$ = inject(CharacterSheetService).setSizeCategory$()
  classWeapons$ = inject(ClassWeaponsService).getClassWeapons$();
  statistics$ = inject(CharacterSheetService).getCaracteristics$();
  strengthBonus$!: Observable<number>;
  dexterityBonus$!: Observable<number>;
  baseAttackBonus$: Observable<number[]> = inject(BaseAttackBonusStreamService).baseAttackBonusStream$;

  ngOnInit(): void {
    this.strengthBonus$ = this.getStrengthBonus$();
    this.dexterityBonus$ = this.getDexterityBonus$();
  }

  getStrengthBonus$(): Observable<number> {
    return this.statistics$.pipe(
      map((stats: CharacterStats) => {
        if (stats) return stats.FOR.getFinalMod();
        else return 0;
      })
    )
  }

  getDexterityBonus$(): Observable<number> {
    return this.statistics$.pipe(
      map((stats: CharacterStats) => {
        if (stats) return stats.DEX.getFinalMod();
        else return 0;
      })
    )
  }
}
