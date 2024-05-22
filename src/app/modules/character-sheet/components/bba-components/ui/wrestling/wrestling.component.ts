import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-wrestling',
  templateUrl: './wrestling.component.html',
  styleUrls: [
    './../../../hp-ac/ui/generic-ui.style.scss',
    './wrestling.component.scss'
  ]
})
export class WrestlingComponent {
  @Input()
  wrestling!: number;
}
