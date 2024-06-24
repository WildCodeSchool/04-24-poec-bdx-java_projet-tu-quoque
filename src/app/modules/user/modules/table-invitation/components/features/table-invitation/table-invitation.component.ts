import { Component } from '@angular/core';
import { TableInvitationService } from '../../../../../../shared/services/table-invitation/table-invitation.service';
import { Observable } from 'rxjs';
import { CharacterService } from '../../../../../../shared/services/character/character.service';
import { UserInfos } from '../../../../../../shared/models/types/users/user-infos';
import { ActivatedRoute } from '@angular/router';
import { CharacterDTO } from '../../../../../../shared/models/types/users/character-dto';
import { ConnectionService } from '../../../../../../shared/services/connection/connection.service';
import { identifierName } from '@angular/compiler';
import { GameTableDTO } from '../../../../../../shared/models/types/users/table-dto';

@Component({
  selector: 'app-table-invitation',
  templateUrl: './table-invitation.component.html',
  styleUrl: './table-invitation.component.scss',
})
export class TableInvitationComponent {
  
  userConnected$: Observable<UserInfos> = this._connectionService.getUserConnected$() as Observable<UserInfos>;
  availableCharacterListNew$: Observable<CharacterDTO[]> = this._tableInvitationService.getCharacterWithoutTableList$();
  tableInvitationList$: Observable<GameTableDTO[]> = this._tableInvitationService.getTableInvitationList$()

  private tableSelected!: number;
  private characterSelected!: number;

  constructor(
    private _tableInvitationService: TableInvitationService,
    private _characterService: CharacterService,
    private _route: ActivatedRoute,
    private _connectionService: ConnectionService
  ) {}

  ngOnInit(): void {
    this._tableInvitationService.setCharacterWithoutTableList$().subscribe();
    this._tableInvitationService.setUserTableInvitationList$().subscribe();
  }

  getTableSelected(event: number): void {
    this.tableSelected = Number(event);
  }

  getCharacterSelected(event: number): void {
    this.characterSelected = Number(event);
  }

  attributeCharacterToTable(): void {
    this._tableInvitationService.updateCharacterTable(this.characterSelected, this.tableSelected).subscribe();
  }
}
