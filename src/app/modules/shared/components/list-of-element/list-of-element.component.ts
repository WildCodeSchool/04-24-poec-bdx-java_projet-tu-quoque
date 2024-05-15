import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-list-of-element',
  templateUrl: './list-of-element.component.html',
  styleUrl: './list-of-element.component.scss',
})
export class ListOfElementComponent {
  @Input()
  elementList!: any;

  @Input()
  elementIcon!: string;

  @Input()
  replacementIcon!: string;

  @Input()
  baseUrl!: string;

  @Input()
  isForDrawing: boolean = false

  @Output()
  sendDrawingUrl: EventEmitter<string> = new EventEmitter()


  onClick(event: any): void {
    this.sendDrawingUrl.emit(event)
  }
  deleteElement(): void {
    alert("On supprime vraiment ?")
    console.log('delete');
  }
}
