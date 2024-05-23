import { Observable, map, switchMap, takeUntil } from "rxjs";
import { BaseShape } from "../../../../../../../../../../../../shared/models/class/BaseShape";

export class TriangleShape extends BaseShape { 
  protected drawShape(
    start$: Observable<MouseEvent | TouchEvent>,
    move$: Observable<MouseEvent | TouchEvent>,
    end$: Observable<MouseEvent | TouchEvent>
  ): void {
    let startPos: { x: number; y: number };
    let lastMovePos: { x: number; y: number };

    const triangle$ = start$
      .pipe(
        switchMap((startEvent: MouseEvent | TouchEvent) => {
          startPos = this._drawingService.getCoordinates(this.canvasRef.nativeElement, startEvent);
          lastMovePos = { ...startPos };

          const moveSubscription = move$
            .pipe(
              map((moveEvent: MouseEvent | TouchEvent) => {
                const currentPos = this._drawingService.getCoordinates(this.canvasRef.nativeElement, moveEvent);
                lastMovePos = currentPos;
                return { startX: startPos.x, startY: startPos.y, currentX: currentPos.x, currentY: currentPos.y };
              }),
              takeUntil(end$)
            )
            .subscribe(({ startX, startY, currentX, currentY }) => {
              this.clearAndRedraw();

              const triangleWidth = currentY - startY;
              const triangleHeight = currentX - startX;

              this._ctx.strokeStyle = this._colorService.getCurrentColor();
              this._ctx.lineWidth = this._colorService.getCurrentLineWidth();

              this._ctx.beginPath();
              this._ctx.moveTo(startX, startY);
              this._ctx.lineTo(startX + triangleWidth / 2, startY + triangleHeight);
              this._ctx.lineTo(startX - triangleWidth / 2, startY + triangleHeight);
              this._ctx.closePath();
              this._ctx.stroke();
            });

          return end$
            .pipe(
              map((endEvent: MouseEvent | TouchEvent) => {
                const currentPos = lastMovePos;
                const triangleHeight = currentPos.y - startPos.y;
                const triangleWidth = currentPos.x - startPos.x;

                const path = [
                  { x: startPos.x, y: startPos.y },
                  { x: startPos.x + triangleWidth / 2, y: startPos.y + triangleHeight },
                  { x: startPos.x - triangleWidth / 2, y: startPos.y + triangleHeight },
                  { x: startPos.x, y: startPos.y }
                ];

                this._drawnPaths.push({
                  color: this._colorService.getCurrentColor(),
                  lineWidth: this._colorService.getCurrentLineWidth(),
                  path
                });

                this.redrawAll();
                moveSubscription.unsubscribe();
              })
            );
        })
      );

    this._drawingService.addSubscription(triangle$.subscribe());
  }
}