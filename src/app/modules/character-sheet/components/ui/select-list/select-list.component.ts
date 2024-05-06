import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-select-list',
  templateUrl: './select-list.component.html',
  styleUrl: './select-list.component.scss'
})
export class SelectListComponent {
  @Input()
  list$!: Observable<any>;
  @Input()
  selectName!: string;
  @Input()
  selectLabel!: string;
}
