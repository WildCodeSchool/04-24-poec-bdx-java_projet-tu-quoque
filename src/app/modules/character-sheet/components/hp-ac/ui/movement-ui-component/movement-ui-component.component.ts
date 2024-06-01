import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-movement-ui-component',
  templateUrl: './movement-ui-component.component.html',
  styleUrls: [
    './../generic-ui.style.scss',
    './movement-ui-component.component.scss'
  ]
})
export class MovementUiComponent {
  @Input()
  movement$!: Observable<number>;
}
