import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Character } from '../../../../../../../../shared/models/types/users/character.type';
import { CharacterFullDTO } from '../../../../../../../../shared/models/types/users/character-full-dto';

@Component({
  selector: 'app-character-presentation',
  templateUrl: './character-presentation.component.html',
  styleUrl: './character-presentation.component.scss',
})
export class CharacterPresentationComponent {
  
  @Input()
  character!: CharacterFullDTO;

  @Output()
  isCharachterSheetVisible: EventEmitter<boolean> = new EventEmitter<boolean>();

  showCharacterSheet(): void {
    this.isCharachterSheetVisible.emit();
  }
}
