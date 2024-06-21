import { Component, OnInit } from '@angular/core';
import { Observable, switchMap, tap } from 'rxjs';
import { NoteService } from '../../../../../../../shared/services/note/note.service';
import { NoteDTO } from '../../../../../../../shared/models/types/users/note-dto';

@Component({
  selector: 'app-game-notes',
  templateUrl: './game-notes.component.html',
  styleUrl: './game-notes.component.scss',
})
export class GameNotesComponent implements OnInit {

  noteListNew$: Observable<NoteDTO[]> = this._notesService.setGameNotes$()
  .pipe(
    switchMap(() => this._notesService.getTableNoteList$()),
    tap(result => console.log(result))
  );

  constructor(
    private _notesService: NoteService,
  ) {}

  ngOnInit(): void {
    // this._notesService.setGameNotes$();
  }
}
