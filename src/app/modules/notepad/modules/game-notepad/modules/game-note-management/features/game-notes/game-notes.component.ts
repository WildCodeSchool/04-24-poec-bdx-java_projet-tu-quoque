import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { NoteService } from '../../../../../../../shared/services/note/note.service';
import { ConnectionService } from '../../../../../../../shared/services/connection/connection.service';
import { GameTableDTO } from '../../../../../../../shared/models/types/users/table-dto';
import { CharacterFullDTO } from '../../../../../../../shared/models/types/users/character-full-dto';
import { NoteDTO } from '../../../../../../../shared/models/types/users/note-dto';

@Component({
  selector: 'app-game-notes',
  templateUrl: './game-notes.component.html',
  styleUrl: './game-notes.component.scss',
})
export class GameNotesComponent {

  noteListNew$: Observable<NoteDTO[] | null> = this._notesService.setGameNotes$()
  tableConnectedNew$: Observable<GameTableDTO> =
    this._connectionService.getTableConnectedNew$() as Observable<GameTableDTO>;

  characterConnectedNew$: Observable<CharacterFullDTO> =
    this._connectionService.getCharacterConnectedNew$() as Observable<CharacterFullDTO>;

  constructor(
    private _notesService: NoteService,
    private _connectionService: ConnectionService
  ) {}
}
