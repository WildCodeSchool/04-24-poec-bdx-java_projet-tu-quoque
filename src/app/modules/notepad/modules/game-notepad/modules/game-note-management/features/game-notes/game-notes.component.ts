import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { NoteService } from '../../../../../../../shared/services/note/note.service';
import { NoteDTO } from '../../../../../../../shared/models/types/users/note-dto';

@Component({
  selector: 'app-game-notes',
  templateUrl: './game-notes.component.html',
  styleUrl: './game-notes.component.scss',
})
export class GameNotesComponent implements OnInit {

  noteList$: Observable<NoteDTO[] | null> = this._notesService.getTableNoteList$()

  constructor(
    private _notesService: NoteService,
  ) { }

  ngOnInit(): void {
    this._notesService.setGameTableNoteList$();
  }
}
