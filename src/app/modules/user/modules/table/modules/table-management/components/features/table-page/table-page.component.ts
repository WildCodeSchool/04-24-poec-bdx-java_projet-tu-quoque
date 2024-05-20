import { Component, Renderer2 } from '@angular/core';
import { Observable } from 'rxjs';
import { TableService } from '../../../../../../../../shared/services/table/table.service';
import { ActivatedRoute } from '@angular/router';
import { CharacterService } from '../../../../../../../../shared/services/character/character.service';
import { Table } from '../../../../../../../../shared/models/types/users/table.type';
import { Character } from '../../../../../../../../shared/models/types/users/character.type';
import { ChatService } from '../../../../../../../../shared/services/chat/chat.service';
import { Chat } from '../../../../../../../../shared/models/types/users/chat.type';
import { DrawingService } from '../../../../../../../../shared/services/drawing/drawing.service';
import { Drawing } from '../../../../../../../../shared/models/types/users/drawing.type';

@Component({
  selector: 'app-table-page',
  templateUrl: './table-page.component.html',
  styleUrl: './table-page.component.scss',
})
export class TablePageComponent {
  
  id!: number;
  drawingToShow!: string;
  isDrawingVisible: boolean = false;

  table$!: Observable<Table>;
  participantList$!: Observable<Character[]>;
  chatList$!: Observable<Chat[]>;
  drawingList$!: Observable<Drawing[]>;

  constructor(
    private _tableService: TableService,
    private _characterService: CharacterService,
    private _chatService: ChatService,
    private _drawingService: DrawingService,
    private _route: ActivatedRoute,
    private _renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.id = Number(this._route.snapshot.paramMap.get('id'));
    this.table$ = this._tableService.getById$(this.id);
    this.participantList$ = this._characterService.getCharactersByTable$(this.id);
    this.chatList$ = this._chatService.getChatListByTable$(this.id);
    this.drawingList$ = this._drawingService.getDrawingListByTable$(this.id);
  }

  toggleDrawingVisible(event: boolean): void {
    window.scrollTo(0, 0);
    this.isDrawingVisible = !this.isDrawingVisible;
    if (this.isDrawingVisible) {
      this._renderer.setStyle(document.body, 'overflow', 'hidden');
    } else {
      this._renderer.setStyle(document.body, 'overflow', 'auto');
    }
  }

  showDrawing(event: string): void {
    this.drawingToShow = event;
    this.toggleDrawingVisible(true);
  }
}
