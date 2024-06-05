import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-protection-ui',
  templateUrl: './protection-ui.component.html',
  styleUrls: [
    './../../../attacks/ui/attack/attack.component.scss',
    './protection-ui.component.scss'
  ]
})
export class ProtectionUiComponent {
  @Input()
  protection!: string
}
