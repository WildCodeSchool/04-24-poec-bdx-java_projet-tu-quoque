import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { NoteService } from '../../../../../../../shared/services/note/note.service';
import { Note } from '../../../../../../../shared/models/types/users/note.type';
import { ActivatedRoute, Router } from '@angular/router';
import { UserInfos } from '../../../../../../../shared/models/types/users/user-infos';
import { ConnectionService } from '../../../../../../../shared/services/connection/connection.service';

@Component({
  selector: 'app-user-notes',
  templateUrl: './user-notes.component.html',
  styleUrl: './user-notes.component.scss',
})
export class UserNotesComponent {
  
  user!: UserInfos;
  role: String = 'user';

  constructor(private _route: ActivatedRoute, private _router: Router) {}

  ngOnInit(): void {
    const userData = this._route.snapshot.data['user'];
    this.user = userData;
  }

  onClick() {
    this._router.navigateByUrl(`notepad/user/notes/creation/${this.role}`);
  }
}
