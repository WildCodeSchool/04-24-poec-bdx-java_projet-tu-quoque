import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { BbaService } from '../../../../shared/services/bba.service';

@Component({
  selector: 'app-bba-component',
  templateUrl: './bba-component.component.html',
  styleUrl: './bba-component.component.scss'
})
export class BbaComponentComponent {
  bbaService = inject(BbaService);
  bba$: Observable<number[]> = this.bbaService.bbaStream$;
  magicalResistance: number = 0;
  wrestling: number = 0;
}
