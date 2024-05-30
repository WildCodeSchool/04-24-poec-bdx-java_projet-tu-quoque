import { Observable, Subscription, map, takeUntil } from "rxjs";
import { DrawingPoint } from "../drawing-point";
import { DrawingUtilitiesService } from "../../../services/drawing/drawing-utilities.service";
import { ElementRef } from "@angular/core";
import { CanvasDependenciesProvider } from "./canvas-dependencies-provider";

export class TriangleEventHandlers {
  private startPos!: DrawingPoint;
  private lastMovePos!: DrawingPoint;

  constructor(private dependencies : CanvasDependenciesProvider) {}

  handleStartEvent(
    startEvent: MouseEvent | TouchEvent,
    move$: Observable<MouseEvent | TouchEvent>,
    end$: Observable<MouseEvent | TouchEvent>
  ) {
    this.startPos = DrawingPoint.fromEvent(startEvent, this.dependencies.canvasRef.nativeElement, this.dependencies.drawingService);
    this.lastMovePos = this.startPos;

    const moveSubscription = move$.pipe(
      map(moveEvent => this.updateLastMovePos(moveEvent)),
      takeUntil(end$)
    ).subscribe(({ startX, startY, currentX, currentY }) => {
      this.dependencies.clearAndRedraw();
      this.drawTriangle(startX, startY, currentX, currentY);
    });

    return end$.pipe(
      map(() => this.handleEndEvent(moveSubscription))
    );
  }

  private updateLastMovePos(moveEvent: MouseEvent | TouchEvent) {
    const currentPos = DrawingPoint.fromEvent(moveEvent, this.dependencies.canvasRef.nativeElement, this.dependencies.drawingService);
    this.lastMovePos = currentPos;
    return { startX: this.startPos.x, startY: this.startPos.y, currentX: currentPos.x, currentY: currentPos.y };
  }

  private drawTriangle(startX: number, startY: number, currentX: number, currentY: number) {
    const triangleWidth = currentX - startX;
    const triangleHeight = currentY - startY;

    this.dependencies.ctx.strokeStyle = this.dependencies.currentColor;
    this.dependencies.ctx.lineWidth = this.dependencies.currentLineWidth;

    this.dependencies.ctx.beginPath();
    this.dependencies.ctx.moveTo(startX, startY);
    this.dependencies.ctx.lineTo(startX + triangleWidth / 2, startY + triangleHeight);
    this.dependencies.ctx.lineTo(startX - triangleWidth / 2, startY + triangleHeight);
    this.dependencies.ctx.closePath();
    this.dependencies.ctx.stroke();
  }

  private handleEndEvent(moveSubscription: Subscription) {
    const path = this.generateTrianglePath(this.startPos, this.lastMovePos);

    this.dependencies.drawnPaths.push({
      color: this.dependencies.currentColor,
      lineWidth: this.dependencies.currentLineWidth,
      path
    });

    this.dependencies.redrawAll();
    moveSubscription.unsubscribe();
  }

  private generateTrianglePath(startPos: { x: number; y: number }, lastMovePos: { x: number; y: number }) {
    const triangleWidth = lastMovePos.x - startPos.x;
    const triangleHeight = lastMovePos.y - startPos.y;

    return [
      { x: startPos.x, y: startPos.y },
      { x: startPos.x + triangleWidth / 2, y: startPos.y + triangleHeight },
      { x: startPos.x - triangleWidth / 2, y: startPos.y + triangleHeight },
      { x: startPos.x, y: startPos.y }
    ];
  }
}
