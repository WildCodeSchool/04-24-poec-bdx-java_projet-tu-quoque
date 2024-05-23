import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-shield-ui',
  templateUrl: './shield-ui.component.html',
  styleUrls: [
    './../../../attacks/ui/attack/attack.component.scss',
    './shield-ui.component.scss'
  ]
})
export class ShieldUiComponent {
  @Input()
  shield!: string;
}
