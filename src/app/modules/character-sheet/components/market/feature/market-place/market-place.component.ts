import { Component, DestroyRef, EventEmitter, inject, Output } from '@angular/core';
import { ClassWeaponsService } from '../../../../shared/services/class-weapons.service';
import { PurseService } from '../../../../shared/services/market/purse.service';
import { WeaponDetails } from '../../../../models/types/weapons/weapon.type';
import { Observable } from 'rxjs';
import { Purse } from '../../../../models/classes/purse-related/purse.class';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-market-place',
  templateUrl: './market-place.component.html',
  styleUrl: './market-place.component.scss'
})
export class MarketPlaceComponent {
  classWeapons$ = inject(ClassWeaponsService).getClassWeapons$();
  purseService = inject(PurseService);
  destroyRef = inject(DestroyRef);
  purse$!: Observable<Purse>;
  purse!: Purse;

  @Output()
  emitter: EventEmitter<WeaponDetails> = new EventEmitter();

  ngOnInit() {
    this.purse$ = this.purseService.getPurse$();
    this.purse$.pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe((purse: Purse) => this.purse = purse);
  }

  buy(weapon: WeaponDetails): void {
    if (this.purseService.buy(weapon.price))
      this.emitter.emit(weapon);
  }

  compareWeaponPriceAndPurse(weaponPrice: string): boolean {
    return this.purse >= new Purse(weaponPrice);
  }
}
