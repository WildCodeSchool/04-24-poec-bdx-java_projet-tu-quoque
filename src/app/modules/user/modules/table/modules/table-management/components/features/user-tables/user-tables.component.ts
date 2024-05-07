import { Component, OnInit } from '@angular/core';
import { TableService } from '../../../../../../../../shared/services/table/table.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-tables',
  templateUrl: './user-tables.component.html',
  styleUrl: './user-tables.component.scss'
})
export class UserTablesComponent {

  userTableList$: Observable<any> = this._tableService.getUserTableList()

  constructor(private _tableService: TableService){}

}
