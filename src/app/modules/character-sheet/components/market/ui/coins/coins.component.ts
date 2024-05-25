import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-coins',
  templateUrl: './coins.component.html',
  styleUrl: './coins.component.scss'
})
export class CoinsComponent {
  @Input()
  color: string = 'black';
}
