import { Component } from '@angular/core';

@Component({
  selector: 'app-table-new-drawing',
  templateUrl: './table-new-drawing.component.html',
  styleUrl: './table-new-drawing.component.scss'
})
export class TableNewDrawingComponent {
  currentColor: string = 'black';

  changeColor(color: string) {
    this.currentColor = color;
  }
}
