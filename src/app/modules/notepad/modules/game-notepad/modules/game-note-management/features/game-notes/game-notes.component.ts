import { Component, inject } from '@angular/core';
import { Observable, switchMap, tap } from 'rxjs';
import { NoteService } from '../../../../../../../shared/services/note/note.service';
import { NoteDTO } from '../../../../../../../shared/models/types/users/note-dto';

@Component({
  selector: 'app-game-notes',
  templateUrl: './game-notes.component.html',
  styleUrl: './game-notes.component.scss',
})
export class GameNotesComponent {

  tableList: NoteDTO[] = [];
  _noteService = inject(NoteService);
  noteListNew$: Observable<NoteDTO[]> = this._noteService.getTableNoteList$().pipe(
    tap((val) => {
     console.log("TAP getTableNoteList$", val);
    })
  );

    constructor() {
    }



}
