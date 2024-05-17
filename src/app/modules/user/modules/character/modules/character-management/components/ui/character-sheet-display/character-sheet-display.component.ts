import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-character-sheet-display',
  templateUrl: './character-sheet-display.component.html',
  styleUrl: './character-sheet-display.component.scss',
})
export class CharacterSheetDisplayComponent {
  
  @Output()
  isCharacterSheetVisible: EventEmitter<boolean> = new EventEmitter<boolean>();

  hideCharacterSheet(): void {
    this.isCharacterSheetVisible.emit();
  }
}
