import { Component, OnInit } from '@angular/core';
import { TableService } from '../../../../../../../../shared/services/table/table.service';
import { Observable } from 'rxjs';
import { Table } from '../../../../../../../../shared/models/types/users/table.type';

@Component({
  selector: 'app-user-tables',
  templateUrl: './user-tables.component.html',
  styleUrl: './user-tables.component.scss',
})
export class UserTablesComponent {
  
  userTableList$: Observable<Table[]> = this._tableService.getUserTableList$();
  constructor(private _tableService: TableService) {}

  // ngOnInit(): void {
  //   this._tableService.getAll$().subscribe(res => console.log(res))
  //    ;
    
  // }
}
