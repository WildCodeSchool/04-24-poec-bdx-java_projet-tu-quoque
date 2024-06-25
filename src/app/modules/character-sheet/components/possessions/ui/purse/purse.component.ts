import { Component, Input } from '@angular/core';
import { Purse } from '../../../../models/classes/purse-related/purse.class';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-purse',
  templateUrl: './purse.component.html',
  styleUrl: './purse.component.scss'
})
export class PurseComponent {
  @Input()
  purse$!: Observable<Purse>
}
