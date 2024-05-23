import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-hp-ui-component',
  templateUrl: './hp-ui-component.component.html',
  styleUrls: [
    './../generic-ui.style.scss',
    './hp-ui-component.component.scss',
  ]
})
export class HpUiComponentComponent {
  @Input()
  hitPoints!: number;
}
