import { Component, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CharacterService } from '../../../../../../../../shared/services/character/character.service';
import { Observable, map, switchMap, tap } from 'rxjs';
import { TableService } from '../../../../../../../../shared/services/table/table.service';

@Component({
  selector: 'app-character-page',
  templateUrl: './character-page.component.html',
  styleUrl: './character-page.component.scss',
})
export class CharacterPageComponent implements OnInit {
  
  character$!: Observable<any>;
  table$!: Observable<any>;

  characterDiscussionList: any = [
    {
      id: 1,
      name: 'Discussion 1',
    },
    {
      id: 2,
      name: 'Discussion 2',
    },
    {
      id: 3,
      name: 'Discussion 3',
    },
    {
      id: 4,
      name: 'Discussion 4',
    },
  ];
  isCharacterSheetVisible: boolean = false;

  constructor(
    private _characterService: CharacterService,
    private _tableService: TableService,
    private _route: ActivatedRoute,
    private _renderer: Renderer2
  ) {}

  ngOnInit(): void {
    const id = Number(this._route.snapshot.paramMap.get('id'));
    this.character$ = this._characterService.getCharacterById$(id);
    this.table$ =this._characterService.getCharacterById$(id)
    .pipe(
      switchMap(res => 
        { return this._tableService.getTableById$(res.table_id)}))  
  }

  toggleCharacterSheetVisible(event: boolean): void {
    window.scrollTo(0, 0)
    this.isCharacterSheetVisible = !this.isCharacterSheetVisible
    if(this.isCharacterSheetVisible) {
      this._renderer.setStyle(document.body, 'overflow', 'hidden')
    } else {
      this._renderer.setStyle(document.body, 'overflow', 'auto')
    }
  }
}
