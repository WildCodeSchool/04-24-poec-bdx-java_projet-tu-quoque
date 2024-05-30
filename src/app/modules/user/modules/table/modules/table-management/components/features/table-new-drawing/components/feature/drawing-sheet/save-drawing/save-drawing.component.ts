import { Component, ElementRef, Input } from '@angular/core';
import { DrawingService } from '../../../../../../../../../../../../shared/services/drawing/drawing.service';

@Component({
  selector: 'app-save-drawing',
  templateUrl: './save-drawing.component.html',
  styleUrl: './save-drawing.component.scss'
})
export class SaveDrawingComponent {
  @Input() canvasRef!: ElementRef<HTMLCanvasElement>;
  downloadIcon:string = 'assets/icons/drawTools/download.svg';

  constructor(private _drawingService: DrawingService) {}

  saveDrawing() {
    const canvas = this.canvasRef.nativeElement;
    this._drawingService.save(canvas).subscribe({
      next: (response) => console.log(response),
      error: (error) => console.error(error)
    });
  }
}
