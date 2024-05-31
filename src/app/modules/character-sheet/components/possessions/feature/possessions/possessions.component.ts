import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Purse } from '../../../../models/classes/purse-related/purse.class';
import { PurseService } from '../../../../shared/services/market/purse.service';

@Component({
  selector: 'app-possessions',
  templateUrl: './possessions.component.html',
  styleUrl: './possessions.component.scss'
})
export class PossessionsComponent {
  purse$: Observable<Purse> = inject(PurseService).getPurse$();
}
