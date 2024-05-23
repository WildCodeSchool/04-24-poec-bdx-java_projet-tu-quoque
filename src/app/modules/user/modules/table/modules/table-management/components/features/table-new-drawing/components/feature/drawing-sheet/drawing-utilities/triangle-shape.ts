import { Observable, Subscription, map, switchMap, takeUntil } from "rxjs";
import { BaseShape } from "../../../../../../../../../../../../shared/models/class/base-shape";
import { DrawingPoint } from "../../../../../../../../../../../../shared/models/class/drawing-point";

export class TriangleShape extends BaseShape {
  private startPos!: DrawingPoint;
  private lastMovePos!: DrawingPoint;

  protected drawShape(
    start$: Observable<MouseEvent | TouchEvent>,
    move$: Observable<MouseEvent | TouchEvent>,
    end$: Observable<MouseEvent | TouchEvent>
  ): void {
    const triangle$ = start$.pipe(
      switchMap(startEvent => this.handleStartEvent(startEvent, move$, end$))
    );

    this._drawingService.addSubscription(triangle$.subscribe());
  }

  private handleStartEvent(
    startEvent: MouseEvent | TouchEvent,
    move$: Observable<MouseEvent | TouchEvent>,
    end$: Observable<MouseEvent | TouchEvent>
  ) {
    this.startPos = DrawingPoint.fromEvent(startEvent, this.canvasRef.nativeElement, this._drawingService);
    this.lastMovePos = this.startPos;

    const moveSubscription = move$.pipe(
      map(moveEvent => this.updateLastMovePos(moveEvent)),
      takeUntil(end$)
    ).subscribe(({ startX, startY, currentX, currentY }) => {
      this.clearAndRedraw();
      this.drawTriangle(startX, startY, currentX, currentY);
    });

    return end$.pipe(
      map(() => this.handleEndEvent(moveSubscription))
    );
  }

  private updateLastMovePos(moveEvent: MouseEvent | TouchEvent) {
    const currentPos = DrawingPoint.fromEvent(moveEvent, this.canvasRef.nativeElement, this._drawingService);
    this.lastMovePos = currentPos;
    return { startX: this.startPos.x, startY: this.startPos.y, currentX: currentPos.x, currentY: currentPos.y };
  }

  private drawTriangle(startX: number, startY: number, currentX: number, currentY: number) {
    const triangleWidth = currentY - startY;
    const triangleHeight = currentX - startX;

    this._ctx.strokeStyle = this._currentColor;
    this._ctx.lineWidth = this._currentLineWidth;

    this._ctx.beginPath();
    this._ctx.moveTo(startX, startY);
    this._ctx.lineTo(startX + triangleWidth / 2, startY + triangleHeight);
    this._ctx.lineTo(startX - triangleWidth / 2, startY + triangleHeight);
    this._ctx.closePath();
    this._ctx.stroke();
  }

  private handleEndEvent(moveSubscription: Subscription) {
    const path = this.generateTrianglePath(this.startPos, this.lastMovePos);

    this._drawnPaths.push({
      color: this._currentColor,
      lineWidth: this._currentLineWidth,
      path
    });

    this.redrawAll();
    moveSubscription.unsubscribe();
  }

  private generateTrianglePath(startPos: { x: number; y: number }, lastMovePos: { x: number; y: number }) {
    const triangleHeight = lastMovePos.y - startPos.y;
    const triangleWidth = lastMovePos.x - startPos.x;

    return [
      { x: startPos.x, y: startPos.y },
      { x: startPos.x + triangleWidth / 2, y: startPos.y + triangleHeight },
      { x: startPos.x - triangleWidth / 2, y: startPos.y + triangleHeight },
      { x: startPos.x, y: startPos.y }
    ];
  }
}
