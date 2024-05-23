import { Component } from '@angular/core';

@Component({
  selector: 'app-attacks',
  templateUrl: './attacks.component.html',
  styleUrl: './attacks.component.scss'
})
export class AttacksComponent {
  weapons: string[] = ["épée", "arc", "dague"];
}
