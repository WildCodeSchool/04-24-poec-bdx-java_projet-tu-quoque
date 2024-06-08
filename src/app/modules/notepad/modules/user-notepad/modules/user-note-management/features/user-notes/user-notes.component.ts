import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { NoteService } from '../../../../../../../shared/services/note/note.service';
import { Note } from '../../../../../../../shared/models/types/users/note.type';
import { ActivatedRoute } from '@angular/router';
import { UserInfos } from '../../../../../../../shared/models/types/users/user-infos';
import { ConnectionService } from '../../../../../../../shared/services/connection/connection.service';

@Component({
  selector: 'app-user-notes',
  templateUrl: './user-notes.component.html',
  styleUrl: './user-notes.component.scss',
})
export class UserNotesComponent {

  user!: UserInfos;

  constructor(
    private _notesService: NoteService,
    private _route: ActivatedRoute,
    private _connectionService: ConnectionService
  ) {}

  ngOnInit(): void {
    const userData = this._route.snapshot.data['user'];
    this.user = userData; 
  }
}
