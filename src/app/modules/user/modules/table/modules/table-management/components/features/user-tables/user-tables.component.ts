import { Component, OnInit } from '@angular/core';
import { TableService } from '../../../../../../../../shared/services/table/table.service';
import { Observable } from 'rxjs';
import { Table } from '../../../../../../../../shared/models/types/users/table.type';
import { UserInfos } from '../../../../../../../../shared/models/types/users/user-infos';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-tables',
  templateUrl: './user-tables.component.html',
  styleUrl: './user-tables.component.scss',
})
export class UserTablesComponent {
  user: UserInfos | null = null;

  constructor(
    private _tableService: TableService,
    private _route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const userData = this._route.snapshot.data['user'];
    this.user = userData;
    console.log(this.user)
 
  }
  
  userTableList$: Observable<Table[]> = this._tableService.getAll$();

}
