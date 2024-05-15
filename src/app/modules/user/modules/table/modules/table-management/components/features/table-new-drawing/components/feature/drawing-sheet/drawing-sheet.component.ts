import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-drawing-sheet',
  templateUrl: './drawing-sheet.component.html',
  styleUrl: './drawing-sheet.component.scss'
})
export class DrawingSheetComponent implements AfterViewInit{
  @ViewChild('canvas', {static: true}) canvasRef!: ElementRef<HTMLCanvasElement>;
  private ctx!: CanvasRenderingContext2D;
 
  constructor() {}

  ngAfterViewInit() {
    const canvas: HTMLCanvasElement = this.canvasRef.nativeElement;
    this.ctx = canvas.getContext('2d')!;

    this.initCanvas(canvas);
  }

  initCanvas(canvas: HTMLCanvasElement): void {
    let draw = false;
    let prevX = 0;
    let prevY = 0;

    this.ctx.strokeStyle = 'black';
    this.ctx.lineWidth = 2;

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
    this.ctx.beginPath();
    this.ctx.moveTo(depX, depY);
    this.ctx.lineTo(destX, destY);
    this.ctx.closePath();
    this.ctx.stroke();
  }

}
