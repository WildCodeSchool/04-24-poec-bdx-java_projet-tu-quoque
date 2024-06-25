import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-wrestling',
  templateUrl: './wrestling.component.html',
  styleUrls: [
    './../../../survival/ui/generic-ui.style.scss',
    './../base-attack-bonus-ui.style.scss',
    './wrestling.component.scss'
  ]
})
export class WrestlingComponent {
  @Input()
  wrestling!: number;
}
