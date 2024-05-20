import { map, switchMap, takeUntil } from "rxjs";
import { DrawingUtilitiesService } from "../../../../../../../../../../../../shared/services/drawing/drawing-utilities.service";
import { ColorService } from "../../../../../../../../../../../../shared/services/drawing/color.service";
import { ElementRef } from "@angular/core";

export function drawCircle(
    canvasRef: ElementRef,
    _drawingService: DrawingUtilitiesService,
    _colorService: ColorService,
    _ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    _currentColor: string,
    _currentLineWidth: number,
    _drawnPaths: { color: string, lineWidth: number, path: { x: number, y: number }[] }[],
    redrawAll: () => void
  ) {
    _drawingService.unsubscribeAllEvents();
    const canvas = canvasRef.nativeElement;
    
    const { start$, move$, end$ } = _drawingService.captureEvents(canvas);
  
    let startPos: { x: number; y: number };
    let radius: number;
  
    const circle$ = start$
      .pipe(
        switchMap((startEvent: MouseEvent | TouchEvent) => {
          startPos = _drawingService.getCoordinates(canvas, startEvent);
  
          const moveSubscription = move$
            .pipe(
              map((moveEvent: MouseEvent | TouchEvent) => {
                const currentPos = _drawingService.getCoordinates(canvas, moveEvent);
                radius = Math.sqrt(
                  Math.pow(currentPos.x - startPos.x, 2) +
                  Math.pow(currentPos.y - startPos.y, 2)
                );
                return { startPos, currentPos };
              }),
              takeUntil(end$)
            )
            .subscribe(({ startPos, currentPos }) => {
              _ctx.clearRect(0, 0, width, height);
              redrawAll();
  
              _ctx.strokeStyle = _colorService.getCurrentColor();
              _ctx.lineWidth = _colorService.getCurrentLineWidth();
  
              _ctx.beginPath();
              _ctx.arc(startPos.x, startPos.y, radius, 0, 2 * Math.PI);
              _ctx.stroke();
            });
  
          return end$
            .pipe(
              map(() => {
                const centerX = startPos.x;
                const centerY = startPos.y;
  
                const path = [];
                const step = 2 * Math.PI / 100;
                for (let theta = 0; theta < 2 * Math.PI; theta += step) {
                  path.push({
                    x: centerX + radius * Math.cos(theta),
                    y: centerY + radius * Math.sin(theta)
                  });
                }
  
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
  
    const circleSubscription = circle$.subscribe();
    _drawingService.addSubscription(circleSubscription);
  }