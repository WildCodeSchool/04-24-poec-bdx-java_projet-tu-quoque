import { Observable, Subscription, map, takeUntil } from "rxjs";
import { DrawingPoint } from "../drawing-point";
import { DrawingUtilitiesService } from "../../../services/drawing/drawing-utilities.service";
import { ElementRef } from "@angular/core";
import { CanvasDependenciesProvider } from "./canvas-dependencies-provider";

export class SquareEventHandlers {
  private startPos!: DrawingPoint;
  private finalPos!: DrawingPoint;

  constructor(private dependencies : CanvasDependenciesProvider) {}

  handleStartEvent(
    startEvent: MouseEvent | TouchEvent,
    move$: Observable<MouseEvent | TouchEvent>,
    end$: Observable<MouseEvent | TouchEvent>
  ) {
    this.startPos = DrawingPoint.fromEvent(startEvent, this.dependencies.canvasRef.nativeElement, this.dependencies.drawingService);

    const moveSubscription = move$.pipe(
      map(moveEvent => this.calculateSquarePositions(moveEvent)),
      takeUntil(end$)
    ).subscribe(() => {
      this.dependencies.clearAndRedraw();
      this.drawSquare(this.startPos, this.finalPos);
    });

    return end$.pipe(
      map(() => this.handleEndEvent(moveSubscription))
    );
  }

  private calculateSquarePositions(moveEvent: MouseEvent | TouchEvent) {
    this.finalPos = DrawingPoint.fromEvent(moveEvent, this.dependencies.canvasRef.nativeElement, this.dependencies.drawingService);
  }

  private drawSquare(startPos: DrawingPoint, finalPos: DrawingPoint) {
    const squareSize = startPos.distanceTo(finalPos);

    this.dependencies.ctx.strokeStyle = this.dependencies.currentColor;
    this.dependencies.ctx.lineWidth = this.dependencies.currentLineWidth;
    this.dependencies.ctx.strokeRect(startPos.x, startPos.y, squareSize, squareSize);
  }

  private handleEndEvent(moveSubscription: Subscription) {
    const width = this.finalPos.x - this.startPos.x;
    const height = this.finalPos.y - this.startPos.y;
    const squareSize = Math.max(Math.abs(width), Math.abs(height));

    this.dependencies.drawnPaths.push({
      color: this.dependencies.currentColor,
      lineWidth: this.dependencies.currentLineWidth,
      path: this.generateSquarePath(this.startPos, squareSize)
    });

    this.dependencies.redrawAll();
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
