import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-ca-ui-component',
  templateUrl: './ca-ui-component.component.html',
  styleUrls: [
    './../generic-ui.style.scss',
    './ca-ui-component.component.scss'
  ]
})
export class CaUiComponentComponent {
  @Input()
  armorClass!: number;
}
