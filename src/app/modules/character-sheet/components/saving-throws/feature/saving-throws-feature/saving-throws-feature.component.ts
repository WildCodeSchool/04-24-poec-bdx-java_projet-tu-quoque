import { Component, inject } from '@angular/core';
import { SavingThrowsService } from '../../../../shared/services/saving-throws.service';
import { Observable } from 'rxjs';
import { CharacterSavingThrows } from '../../../../models/classes/character-saving-throws.class';

@Component({
  selector: 'app-saving-throws-feature',
  templateUrl: './saving-throws-feature.component.html',
  styleUrl: './saving-throws-feature.component.scss'
})
export class SavingThrowsFeatureComponent {
  savingThrows$: Observable<CharacterSavingThrows> = inject(SavingThrowsService).getCharacterSavingThrows$();
}
