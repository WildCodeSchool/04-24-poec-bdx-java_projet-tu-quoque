import { Component, OnInit } from '@angular/core';
import { TableService } from '../../../../../../../../shared/services/table/table.service';
import { Observable } from 'rxjs';
import { Table } from '../../../../../../../../shared/models/types/users/table.type';
import { UserInfos } from '../../../../../../../../shared/models/types/users/user-infos';
import { ActivatedRoute } from '@angular/router';
import { GameTableDTO } from '../../../../../../../../shared/models/types/users/table-dto';

@Component({
  selector: 'app-user-tables',
  templateUrl: './user-tables.component.html',
  styleUrl: './user-tables.component.scss',
})
export class UserTablesComponent {
  userTableList$: Observable<GameTableDTO[] | null> = this._tableService.getTableList$()
  user: UserInfos | null = null;

  constructor(
    private _route: ActivatedRoute,
    private _tableService: TableService
  ) {}

  ngOnInit(): void {
    const userData = this._route.snapshot.data['user'];
    this.user = userData;
    if(this.user?.playerGameTableList) {
      this._tableService.setTableList(this.user.playerGameTableList)
    }
  }
}
