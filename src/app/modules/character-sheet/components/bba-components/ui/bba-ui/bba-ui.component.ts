import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-bba-ui',
  templateUrl: './bba-ui.component.html',
  styleUrls: [
    './../../../hp-ac/ui/generic-ui.style.scss',
    './../bba-ui.style.scss',
    './bba-ui.component.scss'
  ]
})
export class BbaUiComponent {
  @Input()
  bba$!: Observable<number[]>;
}
