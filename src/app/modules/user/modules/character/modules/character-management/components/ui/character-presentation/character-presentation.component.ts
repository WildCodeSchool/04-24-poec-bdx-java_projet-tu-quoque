import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Character } from '../../../../../../../../shared/models/types/users/character.type';

@Component({
  selector: 'app-character-presentation',
  templateUrl: './character-presentation.component.html',
  styleUrl: './character-presentation.component.scss',
})
export class CharacterPresentationComponent {
  
  @Input()
  character!: Character;

  @Output()
  isCharachterSheetVisible: EventEmitter<boolean> = new EventEmitter<boolean>();

  showCharacterSheet(): void {
    this.isCharachterSheetVisible.emit();
  }
}
