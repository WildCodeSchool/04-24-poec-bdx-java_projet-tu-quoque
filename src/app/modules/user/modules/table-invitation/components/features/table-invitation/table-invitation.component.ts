import { Component } from '@angular/core';
import { TableInvitationService } from '../../../../../../shared/services/table-invitation/table-invitation.service';
import { Observable } from 'rxjs';
import { CharacterService } from '../../../../../../shared/services/character/character.service';
import { Character } from '../../../../../../shared/models/types/users/character.type';
import { TableInvitaition } from '../../../../../../shared/models/types/users/table-invitation.type';

@Component({
  selector: 'app-table-invitation',
  templateUrl: './table-invitation.component.html',
  styleUrl: './table-invitation.component.scss',
})
export class TableInvitationComponent {
  
  tableInvitationList$: Observable<TableInvitaition[]> =
    this._tableInvitationService.getUserTableInvitationList$();
  availableCharacterList$: Observable<Character[]> =
    this._characterService.getUserCharacterWithoutTableList$();

  private tableSelected!: number;
  private characterSelected!: number;

  constructor(
    private _tableInvitationService: TableInvitationService,
    private _characterService: CharacterService
  ) {}

  getTableSelected(event: number): void {
    this.tableSelected = Number(event);
  }

  getCharacterSelected(event: number): void {
    this.characterSelected = Number(event);
  }

  attributeCharacterToTable(): void {}
}
