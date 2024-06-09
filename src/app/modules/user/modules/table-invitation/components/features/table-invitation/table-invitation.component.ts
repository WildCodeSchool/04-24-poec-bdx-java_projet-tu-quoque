import { Component } from '@angular/core';
import { TableInvitationService } from '../../../../../../shared/services/table-invitation/table-invitation.service';
import { Observable } from 'rxjs';
import { CharacterService } from '../../../../../../shared/services/character/character.service';
import { Character } from '../../../../../../shared/models/types/users/character.type';
import { TableInvitation } from '../../../../../../shared/models/types/users/table-invitation.type';
import { UserInfos } from '../../../../../../shared/models/types/users/user-infos';
import { ActivatedRoute } from '@angular/router';
import { CharacterDTO } from '../../../../../../shared/models/types/users/character-dto';

@Component({
  selector: 'app-table-invitation',
  templateUrl: './table-invitation.component.html',
  styleUrl: './table-invitation.component.scss',
})
export class TableInvitationComponent {
  
  // tableInvitationList$: Observable<TableInvitation[]> =
  //   this._tableInvitationService.getUserTableInvitationList$();
  // availableCharacterList$: Observable<Character[]> =
  //   this._characterService.getUserCharacterWithoutTableList$();
  tableInvitationList$!: Observable<TableInvitation[]>;
  availableCharacterList$!: Observable<Character[]>;
  userAllowed!: UserInfos;
  availableCharacterList!: CharacterDTO[];

  private tableSelected!: number;
  private characterSelected!: number;

  constructor(
    private _tableInvitationService: TableInvitationService,
    private _characterService: CharacterService,
    private _route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this._route.data.subscribe(data => {
      this.userAllowed = data['user'] as UserInfos;
      this.loadData();
    });
  }

  private loadData(): void {
    this.tableInvitationList$ = this._tableInvitationService.getUserTableInvitationList$();
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
