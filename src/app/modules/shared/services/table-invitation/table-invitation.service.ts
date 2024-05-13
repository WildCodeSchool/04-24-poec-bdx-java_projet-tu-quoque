import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TableInvitationService {

  private _userId = 1;
  private readonly _BASE_URL = "http://localhost:3000/user_table_invitations";
  userTableInvitationList$: BehaviorSubject<any> = new BehaviorSubject([])

  constructor(private _HTTP: HttpClient) { }

  getTableInvitationList$(): Observable<any> {
    return this._HTTP.get("http://localhost:3000/user_table_invitations")
  }

  getTableInvitationListByUser$(id: number): Observable<any> {
    return this.getTableInvitationList$()
    .pipe(
      map((tableInvitationList: any) => tableInvitationList
      .filter((invitation : any) => Number(invitation.user_id) === id)))
      // methode pour recuperer :
      //     un tableau des noms des tables des invitations 
      //     à partir 
      //     du tableau d'id de tables
  }

  getUserTableInvitationList$(): Observable<any> {
    return this.userTableInvitationList$.value.length ? 
      this.userTableInvitationList$.asObservable() 
      : this.getTableInvitationListByUser$(this._userId)
  }
}
