import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-movement-ui-component',
  templateUrl: './movement-ui-component.component.html',
  styleUrls: [
    './../generic-ui.style.scss',
    './movement-ui-component.component.scss'
  ]
})
export class MovementUiComponent {
  @Input()
  movement!: number;
}
