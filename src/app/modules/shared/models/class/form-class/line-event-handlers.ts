import { Observable, Subscription, map, takeUntil } from "rxjs";
import { DrawingPoint } from "../drawing-point";
import { DrawingUtilitiesService } from "../../../services/drawing/drawing-utilities.service";
import { ElementRef } from "@angular/core";
import { CanvasDependenciesProvider } from "./canvas-dependencies-provider";

export class LineEventHandlers {
    private currentPos!: DrawingPoint;

    constructor(private dependencies: CanvasDependenciesProvider) {}
  
    handleStartEvent(
      startEvent: MouseEvent | TouchEvent,
      move$: Observable<MouseEvent | TouchEvent>,
      end$: Observable<MouseEvent | TouchEvent>
    ) {
      const startPos = this.dependencies.drawingService.getCoordinates(this.dependencies.canvasRef.nativeElement, startEvent);
  
      const moveSubscription = move$.pipe(
        map(moveEvent => this.calculateLinePositions(moveEvent, startPos)),
        takeUntil(end$)
      ).subscribe(({ startX, startY, currentX, currentY }) => {
        this.dependencies.clearAndRedraw();
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
      this.currentPos = DrawingPoint.fromEvent(moveEvent, this.dependencies.canvasRef.nativeElement, this.dependencies.drawingService);
      return { startX: startPos.x, startY: startPos.y, currentX: this.currentPos.x, currentY: this.currentPos.y };
    }
  
    private drawLine(startX: number, startY: number, currentX: number, currentY: number) {
      this.dependencies.ctx.strokeStyle = this.dependencies.currentColor;
      this.dependencies.ctx.lineWidth = this.dependencies.currentLineWidth;
  
      this.dependencies.ctx.beginPath();
      this.dependencies.ctx.moveTo(startX, startY);
      this.dependencies.ctx.lineTo(currentX, currentY);
      this.dependencies.ctx.stroke();
    }
  
    private handleEndEvent(
      startPos: { x: number; y: number },
      moveSubscription: Subscription
    ) {
      const path = [
        { x: startPos.x, y: startPos.y },
        { x: this.currentPos.x, y: this.currentPos.y }
      ];
  
      this.dependencies.drawnPaths.push({
        color: this.dependencies.currentColor,
        lineWidth: this.dependencies.currentLineWidth,
        path
      });
  
      this.dependencies.redrawAll();
      moveSubscription.unsubscribe();
    }
}
