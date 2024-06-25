import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { MovementService } from '../../../../shared/services/survival/movement.service';

@Component({
  selector: 'app-movement-component',
  templateUrl: './movement-component.component.html',
  styleUrl: './movement-component.component.scss'
})
export class MovementComponent {
  movement$: Observable<number> = inject(MovementService).getMovement$();
}
