import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, switchMap } from 'rxjs';
import { TableService } from '../table/table.service';
import { tableInvitaition } from '../../models/types/users/table-invitation.type';
import { Table } from '../../models/types/users/table.type';

@Injectable({
  providedIn: 'root'
})
export class TableInvitationService {

  private _userId = 1;
  private readonly _BASE_URL = "http://localhost:3000/user_table_invitations";
  userTableInvitationList$: BehaviorSubject<any> = new BehaviorSubject([])

  constructor(
    private _HTTP: HttpClient, 
    private _tableService: TableService) { }

  getTableInvitationList$(): Observable<tableInvitaition[]> {
    return this._HTTP.get<tableInvitaition[]>("http://localhost:3000/user_table_invitations")
  }

  getTableInvitationListByUser$(id: number): Observable<number[]> {
    return this.getTableInvitationList$()
    .pipe(
      map((tableInvitationList: tableInvitaition[]) => tableInvitationList
      .filter((invitation : tableInvitaition) => Number(invitation.user_id) === id)),
      map((invitationArray:tableInvitaition[]) => invitationArray.map((invit: tableInvitaition) => invit.table_id))
    )
  }
    
    getTableInvitationListNames$(id: number): Observable<Table[]> {
      return this.getTableInvitationListByUser$(id)
        .pipe(
          switchMap((tableIdList: number[]) => this._tableService.getTableList$()
            .pipe(
              map((tableList: Table[]) => tableList.filter((table: Table) => Number(table.id) === Number(tableIdList))))
            ))
    }

  getUserTableInvitationList$(): Observable<tableInvitaition[]> {
    return this.userTableInvitationList$.value.length ? 
      this.userTableInvitationList$.asObservable() 
      : this.getTableInvitationListNames$(this._userId)
  }
}
