import { Component, inject } from '@angular/core';
import { WeaponsService } from '../../../../shared/services/weapons.service';

@Component({
  selector: 'app-attacks',
  templateUrl: './attacks.component.html',
  styleUrl: './attacks.component.scss'
})
export class AttacksComponent {
  weapons: string[] = ["épée", "arc", "dague"];

  classWeapons$ = inject(WeaponsService).getClassWeapons$();
}
