import { Component, Renderer2 } from '@angular/core';
import { Observable } from 'rxjs';
import { TableService } from '../../../../../../../../shared/services/table/table.service';
import { ActivatedRoute } from '@angular/router';
import { Table } from '../../../../../../../../shared/models/types/users/table.type';
import { Character } from '../../../../../../../../shared/models/types/users/character.type';
import { Chat } from '../../../../../../../../shared/models/types/users/chat.type';
import { Drawing } from '../../../../../../../../shared/models/types/users/drawing.type';
import { UserInfos } from '../../../../../../../../shared/models/types/users/user-infos';
import { TableFullDTO } from '../../../../../../../../shared/models/types/users/table-full-dto';

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
  userAllowed!: UserInfos;
  foundTable!: TableFullDTO;

  constructor(
    private _tableService: TableService,
    private _route: ActivatedRoute,
    private _renderer: Renderer2,
  ) {}

  ngOnInit(): void {
    this._route.data.subscribe(data => {
      this.userAllowed = data['user'] as UserInfos;
      console.log(this.userAllowed)
      this.id = Number(this._route.snapshot.paramMap.get('id'));
      this._tableService.getUserTableByIdNew(this.id).subscribe(response => this.foundTable = response)
    });
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
