import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-self-filled',
  templateUrl: './self-filled.component.html',
  styleUrl: './self-filled.component.scss'
})
export class SelfFilledComponent {
  @Input()
  valueObs$!: Observable<string>;
  @Input()
  unit!: string;
  @Input()
  label!: string;
}
