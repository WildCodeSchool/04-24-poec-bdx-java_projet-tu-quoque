import { Observable, Subscription, map, takeUntil } from "rxjs";
import { DrawingPoint } from "../drawing-point";
import { DrawingUtilitiesService } from "../../../services/drawing/drawing-utilities.service";
import { ElementRef } from "@angular/core";

export class SquareEventHandlers {
  private startPos!: DrawingPoint;
  private finalPos!: DrawingPoint;

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

    const moveSubscription = move$.pipe(
      map(moveEvent => this.calculateSquarePositions(moveEvent)),
      takeUntil(end$)
    ).subscribe(() => {
      this.clearAndRedraw();
      this.drawSquare(this.startPos, this.finalPos);
    });

    return end$.pipe(
      map(() => this.handleEndEvent(moveSubscription))
    );
  }

  private calculateSquarePositions(moveEvent: MouseEvent | TouchEvent) {
    this.finalPos = DrawingPoint.fromEvent(moveEvent, this.canvasRef.nativeElement, this._drawingService);
  }

  private drawSquare(startPos: DrawingPoint, finalPos: DrawingPoint) {
    const squareSize = startPos.distanceTo(finalPos);

    this._ctx.strokeStyle = this._currentColor;
    this._ctx.lineWidth = this._currentLineWidth;
    this._ctx.strokeRect(startPos.x, startPos.y, squareSize, squareSize);
  }

  private handleEndEvent(moveSubscription: Subscription) {
    const width = this.finalPos.x - this.startPos.x;
    const height = this.finalPos.y - this.startPos.y;
    const squareSize = Math.max(Math.abs(width), Math.abs(height));

    this._drawnPaths.push({
      color: this._currentColor,
      lineWidth: this._currentLineWidth,
      path: this.generateSquarePath(this.startPos, squareSize)
    });

    this.redrawAll();
    moveSubscription.unsubscribe();
  }

  private generateSquarePath(startPos: { x: number; y: number }, squareSize: number) {
    return [
      { x: startPos.x, y: startPos.y },
      { x: startPos.x + squareSize, y: startPos.y },
      { x: startPos.x + squareSize, y: startPos.y + squareSize },
      { x: startPos.x, y: startPos.y + squareSize },
      { x: startPos.x, y: startPos.y }
    ];
  }
}
