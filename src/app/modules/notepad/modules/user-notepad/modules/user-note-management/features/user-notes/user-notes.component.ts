import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { NoteService } from '../../../../../../../shared/services/note/note.service';
import { Note } from '../../../../../../../shared/models/types/users/note.type';

@Component({
  selector: 'app-user-notes',
  templateUrl: './user-notes.component.html',
  styleUrl: './user-notes.component.scss',
})
export class UserNotesComponent {
  
  noteList$: Observable<Note[]> = this._notesService.getNoteListByUser();

  constructor(
    private _notesService: NoteService,
  ) {}
}
