import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-available-character-list',
  templateUrl: './available-character-list.component.html',
  styleUrl: './available-character-list.component.scss',
})
export class AvailableCharacterListComponent {

  tableSelected!: number;

  @Input()
  elementList!: any;

  @Input()
  elementIcon!: string;

  @Input()
  toSelectCharacter: boolean = true;

  @Output()
  tableIdSelected: EventEmitter<number> = new EventEmitter();

  @Output()
  characterIdSelected: EventEmitter<number> = new EventEmitter();

  selectTable(id: number): void {
    this.tableIdSelected.emit(id)
    this.tableSelected = id
  }

  selectCharacter(id: any): void {
    this.characterIdSelected.emit(id)
  }


  styleObject(id: number): Object {
    return id === this.tableSelected
      && { fontWeight: 'bold', border: '2px solid white' }
  }
}
