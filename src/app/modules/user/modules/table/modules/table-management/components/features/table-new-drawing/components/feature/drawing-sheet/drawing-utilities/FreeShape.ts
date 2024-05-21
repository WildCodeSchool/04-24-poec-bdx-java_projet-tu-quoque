import { Observable, map, switchMap, takeUntil } from "rxjs";
import { BaseShape } from "./BaseShape";

export class FreeShape extends BaseShape {
    public drawShape(
        start$: Observable<MouseEvent | TouchEvent>,
        move$: Observable<MouseEvent | TouchEvent>,
        end$: Observable<MouseEvent | TouchEvent>
    ): void {
        const canvas: HTMLCanvasElement = this.canvasRef.nativeElement;
        const draw$ = start$
      .pipe(
        switchMap((startEvent: MouseEvent | TouchEvent) => {
          let path: { x: number, y: number }[] = [];
          const startPos = this._drawingService.getCoordinates(canvas, startEvent);
          path.push(startPos);
  
          const moveSubscription = move$
            .pipe(
              map((moveEvent: MouseEvent | TouchEvent) => this._drawingService.getCoordinates(canvas, moveEvent)),
              takeUntil(end$)
            )
            .subscribe(currentPos => {
              path.push(currentPos);
              this.drawOnCanvas(path[path.length - 2], currentPos);
            });
  
          return end$.pipe(
            map(() => {
              this._drawnPaths.push({
                color: this._currentColor,
                lineWidth: this._currentLineWidth,
                path
              });
              moveSubscription.unsubscribe();
            })
          );
        })
      );
  
    const drawSubscription = draw$.subscribe();
    this._drawingService.addSubscription(drawSubscription);
    }

    private drawOnCanvas(
        prevPos: { x: number, y: number }, 
        currentPos: { x: number, y: number }
      ) {
        if (!this._ctx) { 
          return; 
        }
        
        this._ctx.beginPath();
        if (prevPos) {
           this._ctx.moveTo(prevPos.x, prevPos.y);
          this._ctx.lineTo(currentPos.x, currentPos.y);
          this._ctx.stroke();
        }
       }
}