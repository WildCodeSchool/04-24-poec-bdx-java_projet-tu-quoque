import { ElementRef } from "@angular/core";
import { ColorService } from "../../../../../../../../../../../../shared/services/drawing/color.service";
import { DrawingUtilitiesService } from "../../../../../../../../../../../../shared/services/drawing/drawing-utilities.service";
import { map, switchMap, takeUntil } from "rxjs";

export function drawLine(
    canvasRef: ElementRef,
    _drawingService: DrawingUtilitiesService,
    _colorService: ColorService,
    _ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    _currentColor: string,
    _currentLineWidth: number,
    _drawnPaths: { color: string, lineWidth: number, path: {x: number, y: number}[] }[],
    redrawAll: () => void
){
    _drawingService.unsubscribeAllEvents();
    const canvas = canvasRef.nativeElement;
      
    const { start$, move$, end$ } = _drawingService.captureEvents(canvas);

    const line$ = start$
      .pipe(
        switchMap((startEvent: MouseEvent | TouchEvent) => {
          const startPos = _drawingService.getCoordinates(canvas, startEvent);
          let currentX: number;
          let currentY: number;
  
          const moveSubscription = move$
            .pipe(
              map((moveEvent: MouseEvent | TouchEvent) => {
                const currentPos = _drawingService.getCoordinates(canvas, moveEvent);
                currentX = currentPos.x;
                currentY = currentPos.y;
                return { startX: startPos.x, startY: startPos.y, currentX: currentPos.x, currentY: currentPos.y };
              }),
              takeUntil(end$)
            )
            .subscribe(({ startX, startY, currentX, currentY }) => {
              _ctx.clearRect(0, 0, width, height);
              redrawAll();
  
              _ctx.strokeStyle = _colorService.getCurrentColor();
              _ctx.lineWidth = _colorService.getCurrentLineWidth();
  
              _ctx.beginPath();
              _ctx.moveTo(startX, startY);
              _ctx.lineTo(currentX, currentY);
              _ctx.stroke();
            });
  
          return end$
            .pipe(
              map(() => {
                const path = [
                  { x: startPos.x, y: startPos.y },
                  { x: currentX, y: currentY }
                ];
  
                _drawnPaths.push({
                    color: _colorService.getCurrentColor(),
                    lineWidth: _colorService.getCurrentLineWidth(),
                  path
                });
  
                redrawAll();
                moveSubscription.unsubscribe();
              })
            );
        })
      );
  
    const lineSubscription = line$.subscribe();
    _drawingService.addSubscription(lineSubscription);
}