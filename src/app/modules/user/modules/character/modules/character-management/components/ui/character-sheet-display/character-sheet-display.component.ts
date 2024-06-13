import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-character-sheet-display',
  templateUrl: './character-sheet-display.component.html',
  styleUrl: './character-sheet-display.component.scss',
})
export class CharacterSheetDisplayComponent {

  @Output()
  isCharacterSheetVisible: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Input()
  characterSheetId!: number;

  hideCharacterSheet(): void {
    this.isCharacterSheetVisible.emit();
  }
}
