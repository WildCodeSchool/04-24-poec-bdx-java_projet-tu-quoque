import { Component, DestroyRef, inject } from '@angular/core';
import { TableInvitationService } from '../../../../../../shared/services/table-invitation/table-invitation.service';
import { Observable } from 'rxjs';
import { UserInfos } from '../../../../../../shared/models/types/users/user-infos';
import { CharacterDTO } from '../../../../../../shared/models/types/users/character-dto';
import { ConnectionService } from '../../../../../../shared/services/connection/connection.service';
import { GameTableDTO } from '../../../../../../shared/models/types/users/table-dto';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

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
    private _connectionService: ConnectionService,
    private _destroyRef: DestroyRef = inject(DestroyRef) 
  ) {}

  ngOnInit(): void {
    this._tableInvitationService.setCharacterWithoutTableList$()
    .pipe(takeUntilDestroyed(this._destroyRef))
    .subscribe();
    this._tableInvitationService.setUserTableInvitationList$()
    .pipe(takeUntilDestroyed(this._destroyRef))
    .subscribe();
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
