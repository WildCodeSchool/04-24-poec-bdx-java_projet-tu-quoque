import { Observable, map, switchMap, takeUntil } from "rxjs";
import { BaseShape } from "./BaseShape";

export class CircleSape extends BaseShape {

  protected drawShape(
    start$: Observable<MouseEvent | TouchEvent>,
    move$: Observable<MouseEvent | TouchEvent>,
    end$: Observable<MouseEvent | TouchEvent>
  ): void {
    let startPos: { x: number; y: number };
    let radius: number;

    const circle$ = start$
      .pipe(
        switchMap((startEvent: MouseEvent | TouchEvent) => {
          startPos = this._drawingService.getCoordinates(this.canvasRef.nativeElement, startEvent);

          const moveSubscription = move$
            .pipe(
              map((moveEvent: MouseEvent | TouchEvent) => {
                const currentPos = this._drawingService.getCoordinates(this.canvasRef.nativeElement, moveEvent);
                radius = Math.sqrt(
                  Math.pow(currentPos.x - startPos.x, 2) +
                  Math.pow(currentPos.y - startPos.y, 2)
                );
                return { startPos, currentPos };
              }),
              takeUntil(end$)
            )
            .subscribe(({ startPos, currentPos }) => {
              this.clearAndRedraw();

              this._ctx.strokeStyle = this._colorService.getCurrentColor();
              this._ctx.lineWidth = this._colorService.getCurrentLineWidth();

              this._ctx.beginPath();
              this._ctx.arc(startPos.x, startPos.y, radius, 0, 2 * Math.PI);
              this._ctx.stroke();
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

    this._drawingService.addSubscription(circle$.subscribe());
  }
}



