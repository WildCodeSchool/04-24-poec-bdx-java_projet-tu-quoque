import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-bba-ui',
  templateUrl: './bba-ui.component.html',
  styleUrls: [
    './../../../survival/ui/generic-ui.style.scss',
    './../base-attack-bonus-ui.style.scss',
    './bba-ui.component.scss'
  ]
})
export class BaseAttackBonusUiComponent {
  @Input()
  baseAttackBonus$!: Observable<number[]>;
}
