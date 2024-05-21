import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { CharacterSavingThrows } from '../../../../models/classes/character-saving-throws.class';

@Component({
  selector: 'app-saving-throws-list-component',
  templateUrl: './saving-throws-list-component.component.html',
  styleUrl: './saving-throws-list-component.component.scss'
})
export class SavingThrowsListComponentComponent {
  @Input()
  savingThrows$!: Observable<CharacterSavingThrows>;
}
