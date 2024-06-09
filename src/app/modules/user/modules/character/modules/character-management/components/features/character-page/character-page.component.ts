import { Component, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CharacterService } from '../../../../../../../../shared/services/character/character.service';
import { Observable, map, switchMap, tap } from 'rxjs';
import { TableService } from '../../../../../../../../shared/services/table/table.service';
import { Character } from '../../../../../../../../shared/models/types/users/character.type';
import { Table } from '../../../../../../../../shared/models/types/users/table.type';
import { ChatService } from '../../../../../../../../shared/services/chat/chat.service';
import { Chat } from '../../../../../../../../shared/models/types/users/chat.type';
import { CharacterFullDTO } from '../../../../../../../../shared/models/types/users/character-full-dto';

@Component({
  selector: 'app-character-page',
  templateUrl: './character-page.component.html',
  styleUrl: './character-page.component.scss',
})
export class CharacterPageComponent implements OnInit {
  
  character$!: Observable<Character>;
  table$!: Observable<Table>;
  chatList$!: Observable<Chat[]>;
  foundCharacter!: CharacterFullDTO;

  isCharacterSheetVisible: boolean = false;

  constructor(
    private _characterService: CharacterService,
    private _tableService: TableService,
    private _chatService: ChatService,
    private _route: ActivatedRoute,
    private _renderer: Renderer2,
    private _router: Router
  ) {}

  ngOnInit(): void {

    const id = Number(this._route.snapshot.paramMap.get('id'));
    this._characterService.getUserCharacterById$(id).subscribe(response => console.log(response));
    this._characterService.getUserCharacterById$(id).subscribe(response => this.foundCharacter = response);


    this.character$ = this._characterService.getById$(id);
    this.table$ = this._characterService.getById$(id).pipe(
      switchMap((res: Character) => {
        return this._tableService.getById$(res.tableId as number);
      })
    );
    this.chatList$ = this._chatService.getChatListByCharacter$(id);
  }

  linkToCharacterTable(id: number): void {
    this._router.navigateByUrl(`user/tables/management/my-tables/${id}`)
  }

  toggleCharacterSheetVisible(event: boolean): void {
    window.scrollTo(0, 0);
    this.isCharacterSheetVisible = !this.isCharacterSheetVisible;
    if (this.isCharacterSheetVisible) {
      this._renderer.setStyle(document.body, 'overflow', 'hidden');
    } else {
      this._renderer.setStyle(document.body, 'overflow', 'auto');
    }
  }
}