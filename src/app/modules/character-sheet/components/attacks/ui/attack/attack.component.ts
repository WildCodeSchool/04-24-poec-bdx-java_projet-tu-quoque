import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-attack',
  templateUrl: './attack.component.html',
  styleUrl: './attack.component.scss'
})
export class AttackComponent {
  @Input()
  weapon!: string;
}
