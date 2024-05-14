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
  
  tableSelected!: number;
  characterSelected!: number;

  constructor(
    private _tableInvitationService: TableInvitationService,
    private _characterService: CharacterService
  ){}

  getTableSelected(event: number) {
    console.log(event)
    this.tableSelected = event
  }

  getCharacterSelected(event: any) {
    console.log(event)
    this.characterSelected = event
  }

  attributeCharacterToTable(): void {
    console.log(` table n°: ${this.tableSelected}, personnage n°: ${this.characterSelected}`)
  }
}
