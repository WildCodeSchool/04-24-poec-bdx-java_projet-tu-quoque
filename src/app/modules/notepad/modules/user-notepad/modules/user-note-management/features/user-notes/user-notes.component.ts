import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { NoteService } from '../../../../../../../shared/services/note/note.service';
import { ActivatedRoute } from '@angular/router';
import { Note } from '../../../../../../../shared/models/types/users/note.type';

@Component({
  selector: 'app-user-notes',
  templateUrl: './user-notes.component.html',
  styleUrl: './user-notes.component.scss'
})
export class UserNotesComponent {
  noteList$!: Observable<Note[]>

  constructor(
    private _notesService: NoteService, 
    private _route: ActivatedRoute
  ){}
  
  ngOnInit(): void {
    this.noteList$ = this._notesService.getNoteListByUser()
    }

}
