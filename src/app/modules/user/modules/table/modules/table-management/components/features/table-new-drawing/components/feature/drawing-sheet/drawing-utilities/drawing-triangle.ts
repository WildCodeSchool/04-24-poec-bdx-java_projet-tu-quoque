import { ElementRef } from "@angular/core";
import { DrawingUtilitiesService } from "../../../../../../../../../../../../shared/services/drawing/drawing-utilities.service";
import { ColorService } from "../../../../../../../../../../../../shared/services/drawing/color.service";
import { map, switchMap, takeUntil } from "rxjs";

export function drawTriangle(
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

    const triangle$ = start$
    .pipe(
      switchMap((startEvent: MouseEvent | TouchEvent) => {
        const startPos = _drawingService.getCoordinates(canvas, startEvent);
        let lastMovePos = { ...startPos };

        const moveSubscription = move$
          .pipe(
            map((moveEvent: MouseEvent | TouchEvent) => {
              const currentPos = _drawingService.getCoordinates(canvas, moveEvent);
              lastMovePos = currentPos;
              return { startX: startPos.x, startY: startPos.y, currentX: currentPos.x, currentY: currentPos.y };
            }),
            takeUntil(end$)
          )
          .subscribe(({ startX, startY, currentX, currentY }) => {
            _ctx.clearRect(0, 0, width, height);
            redrawAll();

            const triangleWidth  = currentY - startY;
            const triangleHeight  = currentX - startX;

            _ctx.strokeStyle = _colorService.getCurrentColor();
            _ctx.lineWidth = _colorService.getCurrentLineWidth();

            _ctx.beginPath();
            _ctx.moveTo(startX, startY);
            _ctx.lineTo(startX + triangleWidth  / 2, startY + triangleHeight);
            _ctx.lineTo(startX - triangleWidth  / 2, startY + triangleHeight);
            _ctx.closePath();
            _ctx.stroke();
          });

        return end$
          .pipe(
            map((endEvent: MouseEvent | TouchEvent) => {
              const currentPos = lastMovePos;
              const triangleHeight = currentPos.y - startPos.y;
              const triangleWidth = currentPos.x - startPos.x;

              const path = [
                { x: startPos.x, y: startPos.y },
                { x: startPos.x + triangleWidth  / 2, y: startPos.y + triangleHeight  },
                { x: startPos.x - triangleWidth  / 2, y: startPos.y + triangleHeight  },
                { x: startPos.x, y: startPos.y }
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

  const triangleSubscription = triangle$.subscribe();
  _drawingService.addSubscription(triangleSubscription);
}