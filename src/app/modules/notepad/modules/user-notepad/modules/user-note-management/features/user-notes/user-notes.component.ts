import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { NoteService } from '../../../../../../../shared/services/note/note.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-notes',
  templateUrl: './user-notes.component.html',
  styleUrl: './user-notes.component.scss'
})
export class UserNotesComponent {
  noteList$!: Observable<any>

  constructor(
    private _notesService: NoteService, 
    private _route: ActivatedRoute
  ){}
  
  ngOnInit(): void {
    const id = Number(this._route.snapshot.paramMap.get('id'))
    this.noteList$ = this._notesService.getNoteListByUser(id)
    }

}
