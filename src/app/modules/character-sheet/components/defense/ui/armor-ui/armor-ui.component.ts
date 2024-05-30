import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-armor-ui',
  templateUrl: './armor-ui.component.html',
  styleUrls: [
    './../../../attacks/ui/attack/attack.component.scss',
    './armor-ui.component.scss']
})
export class ArmorUiComponent {
  @Input()
  armor!: string;
}
