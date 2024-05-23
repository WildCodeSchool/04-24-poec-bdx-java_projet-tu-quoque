import { Observable, Subscription, map, switchMap, takeUntil } from "rxjs";
import { BaseShape } from "../../../../../../../../../../../../shared/models/class/base-shape";

export class FreeShape extends BaseShape {
  public drawShape(
    start$: Observable<MouseEvent | TouchEvent>,
    move$: Observable<MouseEvent | TouchEvent>,
    end$: Observable<MouseEvent | TouchEvent>
  ): void {
    const canvas: HTMLCanvasElement = this.canvasRef.nativeElement;
    const draw$ = start$.pipe(
      switchMap((startEvent: MouseEvent | TouchEvent) => this.handleStartEvent(startEvent, canvas, move$, end$))
    );

    const drawSubscription = draw$.subscribe();
    this._drawingService.addSubscription(drawSubscription);
  }

  private handleStartEvent(
    startEvent: MouseEvent | TouchEvent,
    canvas: HTMLCanvasElement,
    move$: Observable<MouseEvent | TouchEvent>,
    end$: Observable<MouseEvent | TouchEvent>
  ) {
    const startPos = this._drawingService.getCoordinates(canvas, startEvent);
    let path: { x: number, y: number }[] = [startPos];

    const moveSubscription = move$.pipe(
      map(moveEvent => this._drawingService.getCoordinates(canvas, moveEvent)),
      takeUntil(end$)
    ).subscribe(currentPos => {
      path.push(currentPos);
      this.drawOnCanvas(path[path.length - 2], currentPos);
    });

    return end$.pipe(
      map(() => this.handleEndEvent(path, moveSubscription))
    );
  }

  private handleEndEvent(path: { x: number, y: number }[], moveSubscription: Subscription) {
    this._drawnPaths.push({
      color: this._currentColor,
      lineWidth: this._currentLineWidth,
      path
    });

    this.redrawAll();
    moveSubscription.unsubscribe();
  }

  private drawOnCanvas(prevPos: { x: number, y: number }, currentPos: { x: number, y: number }) {
    if (!this._ctx) return;

    this._ctx.beginPath();
    if (prevPos) {
      this._ctx.moveTo(prevPos.x, prevPos.y);
      this._ctx.lineTo(currentPos.x, currentPos.y);
      this._ctx.strokeStyle = this._currentColor;
      this._ctx.lineWidth = this._currentLineWidth;
      this._ctx.stroke();
    }
  }
}
