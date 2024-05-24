import { Observable, Subscription, map, takeUntil } from "rxjs";
import { DrawingPoint } from "../drawing-point";
import { DrawingUtilitiesService } from "../../../services/drawing/drawing-utilities.service";
import { ElementRef } from "@angular/core";

export class TriangleEventHandlers {
  private startPos!: DrawingPoint;
  private lastMovePos!: DrawingPoint;

  constructor(
    private canvasRef: ElementRef,
    private _drawingService: DrawingUtilitiesService,
    private _ctx: CanvasRenderingContext2D,
    private _currentColor: string,
    private _currentLineWidth: number,
    private _drawnPaths: { color: string, lineWidth: number, path: { x: number, y: number }[] }[],
    private clearAndRedraw: () => void,
    private redrawAll: () => void
  ) {}

  handleStartEvent(
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
