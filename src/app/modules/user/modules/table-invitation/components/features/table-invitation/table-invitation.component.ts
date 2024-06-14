import { Component } from '@angular/core';
import { TableInvitationService } from '../../../../../../shared/services/table-invitation/table-invitation.service';
import { Observable } from 'rxjs';
import { CharacterService } from '../../../../../../shared/services/character/character.service';
import { UserInfos } from '../../../../../../shared/models/types/users/user-infos';
import { ActivatedRoute } from '@angular/router';
import { CharacterDTO } from '../../../../../../shared/models/types/users/character-dto';
import { ConnectionService } from '../../../../../../shared/services/connection/connection.service';
import { identifierName } from '@angular/compiler';

@Component({
  selector: 'app-table-invitation',
  templateUrl: './table-invitation.component.html',
  styleUrl: './table-invitation.component.scss',
})
export class TableInvitationComponent {
  
  userConnected$: Observable<UserInfos> = this._connectionService.getUserConnected$() as Observable<UserInfos>;
  availableCharacterListNew$: Observable<CharacterDTO[]> = this._characterService.getUserCharacterAvailableList$();

  private tableSelected!: number;
  private characterSelected!: number;

  constructor(
    private _tableInvitationService: TableInvitationService,
    private _characterService: CharacterService,
    private _route: ActivatedRoute,
    private _connectionService: ConnectionService
  ) {}

  getTableSelected(event: number): void {
    this.tableSelected = Number(event);
  }

  getCharacterSelected(event: number): void {
    this.characterSelected = Number(event);
  }

  attributeCharacterToTable(): void {}
}
