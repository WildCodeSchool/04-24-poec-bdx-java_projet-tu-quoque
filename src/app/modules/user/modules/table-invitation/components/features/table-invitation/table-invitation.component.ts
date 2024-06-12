import { Component } from '@angular/core';
import { TableInvitationService } from '../../../../../../shared/services/table-invitation/table-invitation.service';
import { Observable } from 'rxjs';
import { CharacterService } from '../../../../../../shared/services/character/character.service';
import { Character } from '../../../../../../shared/models/types/users/character.type';
import { TableInvitation } from '../../../../../../shared/models/types/users/table-invitation.type';
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
  
  availableCharacterList$!: Observable<Character[]>;
  userAllowed!: UserInfos; // -------------> En cours de suppresion
  availableCharacterList!: CharacterDTO[];
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

  ngOnInit(): void {
    this._route.data.subscribe(data => {
      this.userAllowed = data['user'] as UserInfos;
      this.loadData();
    });
    this._connectionService.getUserConnected$().subscribe(res => console.log(res))
    this._characterService.getUserCharacterAvailableList$().subscribe(res => console.log(res))
  }

  private loadData(): void {
    this.availableCharacterList$ = this._characterService.getUserCharacterWithoutTableList$();
  }

  getTableSelected(event: number): void {
    this.tableSelected = Number(event);
  }

  getCharacterSelected(event: number): void {
    this.characterSelected = Number(event);
  }

  attributeCharacterToTable(): void {}
}
