import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { TableService } from '../../../../../../../../shared/services/table/table.service';
import { ActivatedRoute } from '@angular/router';
import { CharacterService } from '../../../../../../../../shared/services/character/character.service';

@Component({
  selector: 'app-table-page',
  templateUrl: './table-page.component.html',
  styleUrl: './table-page.component.scss'
})
export class TablePageComponent {

  table$!: Observable<any>
  id!: number
  users$!: Observable<any>
  constructor(
    private _tableService: TableService,
    private _characterService: CharacterService, 
    private _route: ActivatedRoute){}

  ngOnInit(): void {
    this.id = Number(this._route.snapshot.paramMap.get('id'));
    this.table$ = this._tableService.getTableById$(this.id)
    this.users$= this._characterService.getCharactersByTable$(this.id)
  }
}
