import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { TableService } from '../../../../../../../../shared/services/table/table.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-table-page',
  templateUrl: './table-page.component.html',
  styleUrl: './table-page.component.scss'
})
export class TablePageComponent {

  table$!: Observable<any>

  constructor(private _tableService: TableService, private _route: ActivatedRoute){}

  ngOnInit(): void {
    const id = Number(this._route.snapshot.paramMap.get('id'));
    this.table$ = this._tableService.getTableById(id)
  }
}
