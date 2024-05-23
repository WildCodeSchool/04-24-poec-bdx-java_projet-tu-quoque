import { Component } from '@angular/core';

@Component({
  selector: 'app-defenses',
  templateUrl: './defenses.component.html',
  styleUrl: './defenses.component.scss'
})
export class DefensesComponent {
  armor: string = 'armure de cuir';
  shield: string = "n/a";
  protections: string[] = ["anneau"];
}
