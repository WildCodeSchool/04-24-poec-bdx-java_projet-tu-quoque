import { Component, EventEmitter, inject, Output } from '@angular/core';
import { ClassWeaponsService } from '../../../../shared/services/class-weapons.service';
import { PurseService } from '../../../../shared/services/purse.service';
import { WeaponDetails } from '../../../../models/types/weapons/weapon.type';
import { Observable } from 'rxjs';
import { Purse } from '../../../../models/classes/purse-related/purse.class';

@Component({
  selector: 'app-market-place',
  templateUrl: './market-place.component.html',
  styleUrl: './market-place.component.scss'
})
export class MarketPlaceComponent {
  classWeapons$ = inject(ClassWeaponsService).getClassWeapons$();
  purseService = inject(PurseService);
  purse$!: Observable<Purse>;

  @Output()
  emitter: EventEmitter<WeaponDetails> = new EventEmitter();

  ngOnInit() {
    this.purse$ = this.purseService.getPurse$();
  }

  buy(weapon: WeaponDetails) {
    this.emitter.emit(weapon)
  }
}
