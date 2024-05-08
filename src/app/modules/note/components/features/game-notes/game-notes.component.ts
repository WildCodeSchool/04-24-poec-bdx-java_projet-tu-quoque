import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { NoteService } from '../../../../shared/services/note/note.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-game-notes',
  templateUrl: './game-notes.component.html',
  styleUrl: './game-notes.component.scss'
})
export class GameNotesComponent {
  noteList$!: Observable<any>

  constructor(
    private _notesService: NoteService, 
    private _route: ActivatedRoute
  ){}
  
  ngOnInit(): void {
    const id = Number(this._route.snapshot.paramMap.get('id'))
     this.noteList$ = this._notesService.getNoteListByCharacter(id)
  }
  
}
