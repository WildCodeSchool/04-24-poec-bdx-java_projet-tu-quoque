import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-magical-resistance',
  templateUrl: './magical-resistance.component.html',
  styleUrls: [
    './../../../hp-ac/ui/generic-ui.style.scss',
    './../bba-ui.style.scss',
    './magical-resistance.component.scss'
  ]
})
export class MagicalResistanceComponent {
  @Input()
  magicalResistance!: number;
}
