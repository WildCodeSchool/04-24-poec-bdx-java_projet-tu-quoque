import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, switchMap } from 'rxjs';
import { TableService } from '../table/table.service';

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

  getTableInvitationList$(): Observable<any> {
    return this._HTTP.get("http://localhost:3000/user_table_invitations")
  }

  getTableInvitationListByUser$(id: number): Observable<any> {
    return this.getTableInvitationList$()
    .pipe(
      map((tableInvitationList: any) => tableInvitationList
      .filter((invitation : any) => Number(invitation.user_id) === id)),
      map((invitationArray :any) => invitationArray.map((invit: any) => invit.table_id))
    )
  }
    
    getTableInvitationListNames$(id: number) {
      return this.getTableInvitationListByUser$(id)
        .pipe(
          switchMap(tableId => this._tableService.getTableList$()
            .pipe(
              map(tableList => tableList.filter(table => Number(table.id) === Number(tableId))))
            ))
    }

  getUserTableInvitationList$(): Observable<any> {
    return this.userTableInvitationList$.value.length ? 
      this.userTableInvitationList$.asObservable() 
      : this.getTableInvitationListNames$(this._userId)
  }
}
