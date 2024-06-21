import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { CharacterService } from '../../services/character/character.service';
import { TableService } from '../../services/table/table.service';

@Component({
  selector: 'app-list-of-element',
  templateUrl: './list-of-element.component.html',
  styleUrl: './list-of-element.component.scss',
})
export class ListOfElementComponent {
  
  private _characterService = inject(CharacterService);
  private _tableService = inject(TableService);
  @Input()
  elementList!: any;

  @Input()
  elementIcon!: string;

  @Input()
  replacementIcon!: string;

  @Input()
  baseUrl!: string;

  @Input()
  isForDrawing: boolean = false;

  @Input()
  isModifiable: boolean = true;

  @Input()
  role!: string;

  @Output()
  sendDrawingUrl: EventEmitter<string> = new EventEmitter();

  onClick(event: any): void {
    this.sendDrawingUrl.emit(event);
  }
  deleteElement(id: number): void {
    if(this.role === "character") {
      this._characterService.deleteCharacter(id)
    } else if(this.role === "table") {
      this._tableService.deleteTable(id);
    }
  }
}
