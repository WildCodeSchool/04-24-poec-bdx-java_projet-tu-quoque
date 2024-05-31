import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HitPointService } from '../../../../shared/services/survival/hit-point.service';

@Component({
  selector: 'app-hp-component',
  templateUrl: './hp-component.component.html',
  styleUrl: './hp-component.component.scss'
})
export class HitPointComponent {
  service: HitPointService = inject(HitPointService);
  hitPoints$: Observable<number> = this.service.getHitPoints$();
}
