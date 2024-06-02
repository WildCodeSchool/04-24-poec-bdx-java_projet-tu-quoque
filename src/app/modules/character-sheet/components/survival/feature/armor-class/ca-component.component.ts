import { Component, inject } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { ArmorClassService } from '../../../../shared/services/survival/armor-class.service';
import { BASE_ARMOR_CLASS } from '../../../../shared/constants/constants.constant';

@Component({
  selector: 'app-ca-component',
  templateUrl: './ca-component.component.html',
  styleUrl: './ca-component.component.scss'
})
export class ArmorClassComponent {
  dexMod$: Observable<number> = inject(ArmorClassService).getDexMod$();
  armorClass$!: Observable<number>;
  armorClassSurprised$!: Observable<number>;
  armorClassContact$!: Observable<number>;

  ngOnInit() {
    this.calcArmorClass$();
    this.calcArmorClassSurprised$();
    this.calcArmorClassContact$();
  }

  calcArmorClass$(): void {
    this.armorClass$ = this.dexMod$.pipe(
      map((dexMod: number) => BASE_ARMOR_CLASS + dexMod)
      // TODO: add armor and shield when armor and shield will be done
    )
  }

  calcArmorClassSurprised$(): void {
    this.armorClassSurprised$ = of(BASE_ARMOR_CLASS);
    // TODO: add armor when armor will be done
  }

  calcArmorClassContact$(): void {
    this.armorClassContact$ = this.dexMod$.pipe(
      map((dexMod: number) => BASE_ARMOR_CLASS + dexMod)
    )
  }
}
