import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-note-main-page',
  templateUrl: './note-main-page.component.html',
  styleUrl: './note-main-page.component.scss'
})
export class NoteMainPageComponent {

  fakeUserId: number = 1

  fakeCharacterId: number = 42
  // fakeCharacterId!: number

  @Output()
  areNotesVisible: EventEmitter<boolean> = new EventEmitter()

  closeNotes(): void {
    this.areNotesVisible.emit(false)
  }
}
