import { Component, EventEmitter, Input, Output } from '@angular/core';
import { WeaponDetails } from '../../../../models/types/weapons/weapon.type';

@Component({
  selector: 'app-coins',
  templateUrl: './coins.component.html',
  styleUrl: './coins.component.scss'
})
export class CoinsComponent {
  @Input()
  color: string = 'black';

  @Input()
  index: number = 0;

  //isMarketHidden: boolean = true;

  @Output()
  weaponEmitter: EventEmitter<WeaponDetails> = new EventEmitter();

  // toggleMarket() {
  //   this.isMarketHidden = !this.isMarketHidden;
  // }

  purchaseWeapon(weapon: WeaponDetails) {
    //this.toggleMarket();
    this.weaponEmitter.emit(weapon);
  }
}
