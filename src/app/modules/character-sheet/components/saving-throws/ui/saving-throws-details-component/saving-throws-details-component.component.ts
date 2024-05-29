import { Component, Input } from '@angular/core';
import { SavingThrow } from '../../../../models/classes/saving-throw.class';

@Component({
  selector: '[saving-throws-row]',
  templateUrl: './saving-throws-details-component.component.html',
  styleUrl: './saving-throws-details-component.component.scss'
})
export class SavingThrowsDetailsComponent {
  @Input()
  savingThrow!: SavingThrow;
}
