import { Observable, Subscription, map, takeUntil } from "rxjs";
import { DrawingPoint } from "../drawing-point";
import { DrawingUtilitiesService } from "../../../services/drawing/drawing-utilities.service";
import { ElementRef } from "@angular/core";

export class LineEventHandlers {
    private currentPos!: DrawingPoint;

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
      const startPos = this._drawingService.getCoordinates(this.canvasRef.nativeElement, startEvent);
  
      const moveSubscription = move$.pipe(
        map(moveEvent => this.calculateLinePositions(moveEvent, startPos)),
        takeUntil(end$)
      ).subscribe(({ startX, startY, currentX, currentY }) => {
        this.clearAndRedraw();
        this.drawLine(startX, startY, currentX, currentY);
      });
  
      return end$.pipe(
        map(() => this.handleEndEvent(startPos, moveSubscription))
      );
    }
  
    private calculateLinePositions(
      moveEvent: MouseEvent | TouchEvent,
      startPos: { x: number; y: number }
    ) {
      this.currentPos = DrawingPoint.fromEvent(moveEvent, this.canvasRef.nativeElement, this._drawingService);
      return { startX: startPos.x, startY: startPos.y, currentX: this.currentPos.x, currentY: this.currentPos.y };
    }
  
    private drawLine(startX: number, startY: number, currentX: number, currentY: number) {
      this._ctx.strokeStyle = this._currentColor;
      this._ctx.lineWidth = this._currentLineWidth;
  
      this._ctx.beginPath();
      this._ctx.moveTo(startX, startY);
      this._ctx.lineTo(currentX, currentY);
      this._ctx.stroke();
    }
  
    private handleEndEvent(
      startPos: { x: number; y: number },
      moveSubscription: Subscription
    ) {
      const path = [
        { x: startPos.x, y: startPos.y },
        { x: this.currentPos.x, y: this.currentPos.y }
      ];
  
      this._drawnPaths.push({
        color: this._currentColor,
        lineWidth: this._currentLineWidth,
        path
      });
  
      this.redrawAll();
      moveSubscription.unsubscribe();
    }
}
