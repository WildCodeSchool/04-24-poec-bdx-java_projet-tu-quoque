import { Component } from '@angular/core';

@Component({
  selector: 'app-hp-component',
  templateUrl: './hp-component.component.html',
  styleUrl: './hp-component.component.scss'
})
export class HitPointComponent {
  hitPoints: number = 12;
}
