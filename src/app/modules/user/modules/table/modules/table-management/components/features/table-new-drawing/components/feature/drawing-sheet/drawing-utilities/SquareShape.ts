import { Observable, map, switchMap, takeUntil } from "rxjs";
import { BaseShape } from "../../../../../../../../../../../../shared/models/class/BaseShape";

export class SquareShape extends BaseShape {
  protected drawShape(
    start$: Observable<MouseEvent | TouchEvent>,
    move$: Observable<MouseEvent | TouchEvent>,
    end$: Observable<MouseEvent | TouchEvent>
  ): void {
    let startPos: { x: number; y: number };
    let finalPos: { x: number; y: number };

    const square$ = start$
      .pipe(
        switchMap((startEvent: MouseEvent | TouchEvent) => {
          startPos = this._drawingService.getCoordinates(this.canvasRef.nativeElement, startEvent);

          const moveSubscription = move$
            .pipe(
              map((moveEvent: MouseEvent | TouchEvent) => {
                const currentPos = this._drawingService.getCoordinates(this.canvasRef.nativeElement, moveEvent);
                finalPos = currentPos;
                const width = currentPos.x - startPos.x;
                const height = currentPos.y - startPos.y;
                const squareSize = Math.max(Math.abs(width), Math.abs(height));

                this.clearAndRedraw();

                this._ctx.strokeStyle = this._currentColor;
                this._ctx.lineWidth = this._currentLineWidth;
                this._ctx.strokeRect(startPos.x, startPos.y, squareSize, squareSize);

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

                this._drawnPaths.push({
                  color: this._currentColor,
                  lineWidth: this._currentLineWidth,
                  path: [
                    { x: startPos.x, y: startPos.y },
                    { x: startPos.x + squareSize, y: startPos.y },
                    { x: startPos.x + squareSize, y: startPos.y + squareSize },
                    { x: startPos.x, y: startPos.y + squareSize },
                    { x: startPos.x, y: startPos.y }
                  ]
                });

                this.redrawAll();
                moveSubscription.unsubscribe();
              })
            );
        })
      );

    this._drawingService.addSubscription(square$.subscribe());
  }
}