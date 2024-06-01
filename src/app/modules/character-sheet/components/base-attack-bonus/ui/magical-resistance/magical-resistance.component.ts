import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-magical-resistance',
  templateUrl: './magical-resistance.component.html',
  styleUrls: [
    './../../../survival/ui/generic-ui.style.scss',
    './../base-attack-bonus-ui.style.scss',
    './magical-resistance.component.scss'
  ]
})
export class MagicalResistanceComponent {
  @Input()
  magicalResistance!: number;
}
