import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-ca-ui-component',
  templateUrl: './ca-ui-component.component.html',
  styleUrls: [
    './../generic-ui.style.scss',
    './ca-ui-component.component.scss'
  ]
})
export class ArmorClassUIComponent {
  @Input()
  armorClass$!: Observable<number>;
  @Input()
  armorClassContact$!: Observable<number>;
  @Input()
  armorClassSurprised$!: Observable<number>;
  @Input()
  dexMod$!: Observable<number>;
}
