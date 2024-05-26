import { Component, inject } from '@angular/core';
import { ClassWeaponsService } from '../../../../shared/services/class-weapons.service';

@Component({
  selector: 'app-buy-weapons',
  templateUrl: './buy-weapons.component.html',
  styleUrl: './buy-weapons.component.scss'
})
export class BuyWeaponsComponent {
  classWeapons$ = inject(ClassWeaponsService).getClassWeapons$();
}
