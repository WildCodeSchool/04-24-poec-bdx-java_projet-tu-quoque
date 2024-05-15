import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { ColorService } from '../../../../../../../../../../../shared/services/drawing/color.service';

@Component({
  selector: 'app-drawing-sheet',
  templateUrl: './drawing-sheet.component.html',
  styleUrl: './drawing-sheet.component.scss'
})
export class DrawingSheetComponent implements AfterViewInit{
  @ViewChild('canvas', {static: true}) canvasRef!: ElementRef<HTMLCanvasElement>;
  private _ctx!: CanvasRenderingContext2D;
  private _currentColor: string = 'black';

  constructor(private _colorService: ColorService) {}

  ngAfterViewInit() {
    const canvas: HTMLCanvasElement = this.canvasRef.nativeElement;
    this._ctx = canvas.getContext('2d')!;
    
    this.initCanvas(canvas);
    this._colorService.color$.subscribe(color => {
      this.setColor(color);
    })
  }

  initCanvas(canvas: HTMLCanvasElement): void {
    let draw = false;
    let prevX = 0;
    let prevY = 0;

    this._ctx.strokeStyle = 'black';
    this._ctx.lineWidth = 2;

    // Ajoutez l'événement de clic de la souris pour commencer à dessiner
    canvas.addEventListener('mousedown', (e) => {
      draw = true;
      prevX = (e.clientX - canvas.offsetLeft) * canvas.width / canvas.clientWidth;
      prevY = (e.clientY - canvas.offsetTop) * canvas.height / canvas.clientHeight;
    });

    // Ajoutez l'événement de mouvement de la souris pour suivre la position du dessin et dessiner
    canvas.addEventListener('mousemove', (e) => {
      if (draw) {
        const currentX = (e.clientX - canvas.offsetLeft) * canvas.width / canvas.clientWidth;
        const currentY = (e.clientY - canvas.offsetTop) * canvas.height / canvas.clientHeight;
        this.draw(prevX, prevY, currentX, currentY);
        prevX = currentX;
        prevY = currentY;
      }
    });

    // Ajoutez l'événement de relâchement du clic de la souris pour arrêter de dessiner
    canvas.addEventListener('mouseup', () => {
      draw = false;
    });

    // Ajoutez l'événement pour quitter le canvas pour arrêter de dessiner
    canvas.addEventListener('mouseleave', () => {
      draw = false;
    });
  }

  draw(depX: number, depY: number, destX: number, destY: number): void {
    this._ctx.beginPath();
    this._ctx.moveTo(depX, depY);
    this._ctx.lineTo(destX, destY);
    this._ctx.closePath();
    this._ctx.stroke();
  }

  setColor(color: string) {
    this._currentColor = color;
    this._ctx.strokeStyle = color;
  }

}
