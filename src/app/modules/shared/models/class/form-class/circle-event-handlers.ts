import { Observable, Subscription, map, takeUntil } from "rxjs";
import { DrawingUtilitiesService } from "../../../services/drawing/drawing-utilities.service";
import { ElementRef } from "@angular/core";
import { CanvasDependenciesProvider } from "./canvas-dependencies-provider";

export class CircleShapeEventHandlers {
  private radius: number = 0;

  constructor(private dependencies : CanvasDependenciesProvider) {}

  handleStartEvent(
    startEvent: MouseEvent | TouchEvent,
    move$: Observable<MouseEvent | TouchEvent>,
    end$: Observable<MouseEvent | TouchEvent>
  ): Observable<void> {
    const startPos = this.dependencies.drawingService.getCoordinates(this.dependencies.canvasRef.nativeElement, startEvent);
    
    const moveSubscription = move$.pipe(
      map(moveEvent => this.calculateRadiusAndPositions(moveEvent, startPos)),
      takeUntil(end$)
    ).subscribe(({ startPos, currentPos, radius }) => {
      this.radius = radius;
      this.dependencies.clearAndRedraw();
      this.drawCircle(startPos, radius);
    });

    return end$.pipe(
      map(() => this.handleEndEvent(startPos, this.radius, moveSubscription))
    );
  }

  private calculateRadiusAndPositions(moveEvent: MouseEvent | TouchEvent, startPos: { x: number; y: number }) {
    const currentPos = this.dependencies.drawingService.getCoordinates(this.dependencies.canvasRef.nativeElement, moveEvent);
    const radius = Math.sqrt(
      Math.pow(currentPos.x - startPos.x, 2) + Math.pow(currentPos.y - startPos.y, 2)
    );
    return { startPos, currentPos, radius };
  }

  private drawCircle(center: { x: number; y: number }, radius: number) {
    this.dependencies.ctx.strokeStyle = this.dependencies.currentColor;
    this.dependencies.ctx.lineWidth = this.dependencies.currentLineWidth;

    this.dependencies.ctx.beginPath();
    this.dependencies.ctx.arc(center.x, center.y, radius, 0, 2 * Math.PI);
    this.dependencies.ctx.stroke();
  }

  private handleEndEvent(startPos: { x: number; y: number }, radius: number, moveSubscription: Subscription): void {
    const path = this.generateCirclePath(startPos, radius);

    this.dependencies.drawnPaths.push({
      color: this.dependencies.currentColor,
      lineWidth: this.dependencies.currentLineWidth,
      path
    });

    this.dependencies.redrawAll();
    moveSubscription.unsubscribe();
  }

  private generateCirclePath(center: { x: number; y: number }, radius: number) {
    const path = [];
    const step = 2 * Math.PI / 100;
    for (let theta = 0; theta < 2 * Math.PI; theta += step) {
      path.push({
        x: center.x + radius * Math.cos(theta),
        y: center.y + radius * Math.sin(theta)
      });
    }
    return path;
  }
}