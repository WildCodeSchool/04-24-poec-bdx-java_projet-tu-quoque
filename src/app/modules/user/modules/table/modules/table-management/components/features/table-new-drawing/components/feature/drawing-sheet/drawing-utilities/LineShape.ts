import { Observable, map, switchMap, takeUntil } from "rxjs";
import { BaseShape } from "../../../../../../../../../../../../shared/models/class/BaseShape";

export class LineShape extends BaseShape {
  protected drawShape(
    start$: Observable<MouseEvent | TouchEvent>,
    move$: Observable<MouseEvent | TouchEvent>,
    end$: Observable<MouseEvent | TouchEvent>
  ): void {
    let startPos: { x: number; y: number };
    let currentX: number;
    let currentY: number;

    const line$ = start$
      .pipe(
        switchMap((startEvent: MouseEvent | TouchEvent) => {
          startPos = this._drawingService.getCoordinates(this.canvasRef.nativeElement, startEvent);

          const moveSubscription = move$
            .pipe(
              map((moveEvent: MouseEvent | TouchEvent) => {
                const currentPos = this._drawingService.getCoordinates(this.canvasRef.nativeElement, moveEvent);
                currentX = currentPos.x;
                currentY = currentPos.y;
                return { startX: startPos.x, startY: startPos.y, currentX, currentY };
              }),
              takeUntil(end$)
            )
            .subscribe(({ startX, startY, currentX, currentY }) => {
              this.clearAndRedraw();

              this._ctx.strokeStyle = this._currentColor;
              this._ctx.lineWidth = this._currentLineWidth; 

              this._ctx.beginPath();
              this._ctx.moveTo(startX, startY);
              this._ctx.lineTo(currentX, currentY);
              this._ctx.stroke();
            });

          return end$
            .pipe(
              map(() => {
                const path = [
                  { x: startPos.x, y: startPos.y },
                  { x: currentX, y: currentY }
                ];

                this._drawnPaths.push({
                  color: this._currentColor,
                  lineWidth: this._currentLineWidth,
                  path
                });

                this.redrawAll();
                moveSubscription.unsubscribe();
              })
            );
        })
      );

    this._drawingService.addSubscription(line$.subscribe());
  }
}