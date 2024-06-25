import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { NoteService } from '../../services/note/note.service';
import { ActivatedRoute } from '@angular/router';
import { Note } from '../../models/types/users/note.type';

@Component({
  selector: 'app-show-comment-page',
  templateUrl: './show-comment-page.component.html',
  styleUrl: './show-comment-page.component.scss',
})
export class ShowCommentPageComponent {
  
  note$!: Observable<Note>;

  constructor(
    private _noteService: NoteService,
    private _route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id: number = Number(this._route.snapshot.paramMap.get('id'));
    this.note$ = this._noteService.getNoteById$(id);
  }
}
