import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-character-presentation',
  templateUrl: './character-presentation.component.html',
  styleUrl: './character-presentation.component.scss'
})
export class CharacterPresentationComponent {

  @Input()
  character!: any

  @Output()
  isCharachterSheetVisible: EventEmitter<boolean> = new EventEmitter<boolean>()


  showCharacterSheet(): void {
    this.isCharachterSheetVisible.emit()
  }
}
