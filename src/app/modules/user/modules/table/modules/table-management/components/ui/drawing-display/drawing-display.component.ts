import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-drawing-display',
  templateUrl: './drawing-display.component.html',
  styleUrl: './drawing-display.component.scss',
})
export class DrawingDisplayComponent {

  @Input()
  drawingToShow!: string;
  
  @Output()
  isDrawingVisible: EventEmitter<boolean> = new EventEmitter<boolean>();

  hideDrawing(): void {
    this.isDrawingVisible.emit();
  }
}
