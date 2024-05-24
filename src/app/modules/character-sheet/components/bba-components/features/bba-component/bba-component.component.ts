import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseAttackBonusService } from '../../../../shared/services/bba.service';

@Component({
  selector: 'app-bba-component',
  templateUrl: './bba-component.component.html',
  styleUrl: './bba-component.component.scss'
})
export class BaseAttackBonusComponent {
  baseAttackBonus: Observable<number[]> = inject(BaseAttackBonusService).baseAttackBonusStream$;
  magicalResistance: number = 0;
  wrestling: number = 0;
}
