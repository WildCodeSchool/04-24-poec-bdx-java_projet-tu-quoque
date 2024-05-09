import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-notepad-main-page',
  templateUrl: './notepad-main-page.component.html',
  styleUrl: './notepad-main-page.component.scss'
})
export class NotepadMainPageComponent {
  fakeUserId: number = 1

  fakeCharacterId: number = 42
  // fakeCharacterId!: number

  @Output()
  areNotesVisible: EventEmitter<boolean> = new EventEmitter()

  closeNotes(): void {
    this.areNotesVisible.emit(false)
  }

}
