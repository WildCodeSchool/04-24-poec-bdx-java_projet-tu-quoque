import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-hp-ui-component',
  templateUrl: './hp-ui-component.component.html',
  styleUrls: [
    './../generic-ui.style.scss',
    './hp-ui-component.component.scss',
  ]
})
export class HitPointUIComponent {
  @Input()
  hitPoints$!: Observable<number>;
}
