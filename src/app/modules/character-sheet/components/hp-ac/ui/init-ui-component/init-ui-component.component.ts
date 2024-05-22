import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-init-ui-component',
  templateUrl: './init-ui-component.component.html',
  styleUrls: [
    './../generic-ui.style.scss',
    './init-ui-component.component.scss'
  ]
})
export class InitUiComponentComponent {
  @Input()
  init!: number;
}
