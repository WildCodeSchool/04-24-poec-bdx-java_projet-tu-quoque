import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CanvasRedrawService {
  redrawAll(
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    drawnPaths: { color: string, lineWidth: number, path: {x: number, y: number}[] }[],
    currentColor: string,
    currentLineWidth: number
  ) {
    ctx.clearRect(0, 0, width, height);

    drawnPaths.forEach(pathInfo => {
      ctx.strokeStyle = pathInfo.color;
      ctx.lineWidth = pathInfo.lineWidth;

      const path = pathInfo.path;
      if (path.length > 1) {
        ctx.beginPath();
        ctx.moveTo(path[0].x, path[0].y);
        for (let i = 1; i < path.length; i++) {
          ctx.lineTo(path[i].x, path[i].y);
        }
        ctx.stroke();
      }
    });
    
    ctx.strokeStyle = currentColor;
    ctx.lineWidth = currentLineWidth;
  }
}
