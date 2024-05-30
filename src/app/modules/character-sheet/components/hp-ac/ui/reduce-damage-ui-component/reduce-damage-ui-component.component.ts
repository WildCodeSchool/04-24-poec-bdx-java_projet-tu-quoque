import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-reduce-damage-ui-component',
  templateUrl: './reduce-damage-ui-component.component.html',
  styleUrls: [
    './../generic-ui.style.scss',
    './reduce-damage-ui-component.component.scss'
  ]
})
export class ReduceDamageUiComponent {
  @Input()
  reduceDamage!: number;
}
