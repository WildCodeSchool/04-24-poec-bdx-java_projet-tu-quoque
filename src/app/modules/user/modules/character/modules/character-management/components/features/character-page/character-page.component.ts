import { Component, OnInit, Renderer2, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CharacterService } from '../../../../../../../../shared/services/character/character.service';
import { Observable, switchMap } from 'rxjs';
import { TableService } from '../../../../../../../../shared/services/table/table.service';
import { Character } from '../../../../../../../../shared/models/types/users/character.type';
import { Table } from '../../../../../../../../shared/models/types/users/table.type';
import { Chat } from '../../../../../../../../shared/models/types/users/chat.type';
import { CharacterFullDTO } from '../../../../../../../../shared/models/types/users/character-full-dto';
import { ConnectionService } from '../../../../../../../../shared/services/connection/connection.service';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-character-page',
  templateUrl: './character-page.component.html',
  styleUrl: './character-page.component.scss',
  providers: [MessageService]
})
export class CharacterPageComponent implements OnInit{

  character$!: Observable<Character>;
  private table$!: Observable<Table>;
  chatList$!: Observable<Chat[]>;
  foundCharacter$!: Observable<CharacterFullDTO>;
  private _messageService = inject(MessageService)

  isCharacterSheetVisible: boolean = false;

  constructor(
    private _characterService: CharacterService,
    private _tableService: TableService,
    private _route: ActivatedRoute,
    private _renderer: Renderer2,
    private _connectionService: ConnectionService,
  ) { }

  ngOnInit(): void {
    const id = Number(this._route.snapshot.paramMap.get('id'));
    this.foundCharacter$ = this._characterService.getUserCharacterById$(id);
    this.character$ = this._characterService.getById$(id);

    this.table$ = this._characterService.getById$(id).pipe(
      switchMap((res: Character) => {
        return this._tableService.getById$(res.tableId as number);
      })
    );
  }

  selectCharacterToPlay(foundCharacter: CharacterFullDTO): void {
    this._connectionService.setCharacterConnectedNew(foundCharacter)
    this._connectionService.setTableConnectedNew(null)
    this._messageService.add({ severity: 'info', summary: 'Connecté', detail: `Vous jouez maintenant : ${foundCharacter.name}` });
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