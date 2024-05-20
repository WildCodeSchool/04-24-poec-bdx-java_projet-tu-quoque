import { ElementRef } from "@angular/core";
import { DrawingUtilitiesService } from "../../../../../../../../../../../../shared/services/drawing/drawing-utilities.service";
import { ColorService } from "../../../../../../../../../../../../shared/services/drawing/color.service";
import { map, switchMap, takeUntil } from "rxjs";

export function drawSquare(
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
  ) {
    _drawingService.unsubscribeAllEvents();
    const canvas = canvasRef.nativeElement;
  
    const { start$, move$, end$ } = _drawingService.captureEvents(canvas);
    
    const square$ = start$
      .pipe(
        switchMap((startEvent: MouseEvent | TouchEvent) => {
          const startPos = _drawingService.getCoordinates(canvas, startEvent);
          let finalPos = startPos;
  
          const moveSubscription = move$
            .pipe(
              map((moveEvent: MouseEvent | TouchEvent) => {
                const currentPos = _drawingService.getCoordinates(canvas, moveEvent);
                finalPos = currentPos;
                const width = currentPos.x - startPos.x;
                const height = currentPos.y - startPos.y;
                const squareSize = Math.max(Math.abs(width), Math.abs(height));
  
                _ctx.clearRect(0, 0, width, height);
                redrawAll();
  
                _ctx.strokeStyle = _colorService.getCurrentColor();
                _ctx.lineWidth = _colorService.getCurrentLineWidth();
                _ctx.strokeRect(startPos.x, startPos.y, squareSize, squareSize);
  
                return currentPos;
              }),
              takeUntil(end$)
            )
            .subscribe();
  
          return end$
            .pipe(
              map(() => {
                const width = finalPos.x - startPos.x;
                const height = finalPos.y - startPos.y;
                const squareSize = Math.max(Math.abs(width), Math.abs(height));
  
                _drawnPaths.push({
                  color: _colorService.getCurrentColor(),
                  lineWidth: _colorService.getCurrentLineWidth(),
                  path: [
                    { x: startPos.x, y: startPos.y },
                    { x: startPos.x + squareSize, y: startPos.y },
                    { x: startPos.x + squareSize, y: startPos.y + squareSize },
                    { x: startPos.x, y: startPos.y + squareSize },
                    { x: startPos.x, y: startPos.y }
                  ]
                });
  
                redrawAll();
                moveSubscription.unsubscribe();
              })
            );
        })
      );
  
    const squareSubscription = square$.subscribe();
    _drawingService.addSubscription(squareSubscription);
  }