import { ElementRef, Injectable } from '@angular/core';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CanvasEraseService {

  eraseAll(
    canvasRef: ElementRef<HTMLCanvasElement>,
    drawnPaths: { color: string, lineWidth: number, path: {x: number, y: number}[] }[],
    eventSubscriptions: Subscription[],
    captureEvents: (canvas: HTMLCanvasElement) => void
  ) {
    const canvas: HTMLCanvasElement = canvasRef.nativeElement;
    const context = canvas.getContext('2d');
    if (context) {
      context.clearRect(0, 0, canvas.width, canvas.height);
    }
    drawnPaths.length = 0;
    eventSubscriptions.forEach(sub => sub.unsubscribe());
    eventSubscriptions.length = 0;
    captureEvents(canvas);
  }
}
