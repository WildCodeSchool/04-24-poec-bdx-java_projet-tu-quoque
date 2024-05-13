import { Component } from '@angular/core';
import { TableInvitationService } from '../../../../../../shared/services/table-invitation/table-invitation.service';
import { Observable } from 'rxjs';
import { CharacterService } from '../../../../../../shared/services/character/character.service';

@Component({
  selector: 'app-table-invitation',
  templateUrl: './table-invitation.component.html',
  styleUrl: './table-invitation.component.scss'
})
export class TableInvitationComponent {

  tableInvitationList$: Observable<any> = this._tableInvitationService.getUserTableInvitationList$();
  availableCharacterList$ : Observable<any> = this._characterService.getUserCharacterWithoutTableList$();
  
  constructor(
    private _tableInvitationService: TableInvitationService,
    private _characterService: CharacterService
  ){}

}
