import { Observable, Subscription, map, takeUntil, switchMap } from "rxjs";
import { DrawingUtilitiesService } from "../../../services/drawing/drawing-utilities.service";
import { ElementRef } from "@angular/core";
import { CanvasDependenciesProvider } from "./canvas-dependencies-provider";

export class FreeShapeEventHandlers {
  constructor(private dependencies : CanvasDependenciesProvider) {}

  handleStartEvent(
    startEvent: MouseEvent | TouchEvent,
    canvas: HTMLCanvasElement,
    move$: Observable<MouseEvent | TouchEvent>,
    end$: Observable<MouseEvent | TouchEvent>
  ) {
    const startPos = this.dependencies.drawingService.getCoordinates(canvas, startEvent);
    let path: { x: number, y: number }[] = [startPos];

    const moveSubscription = move$.pipe(
      map(moveEvent => this.dependencies.drawingService.getCoordinates(canvas, moveEvent)),
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
    this.dependencies.drawnPaths.push({
      color: this.dependencies.currentColor,
      lineWidth: this.dependencies.currentLineWidth,
      path
    });

    this.dependencies.redrawAll();
    moveSubscription.unsubscribe();
  }

  private drawOnCanvas(prevPos: { x: number, y: number }, currentPos: { x: number, y: number }) {
    if (!this.dependencies.ctx) return;

    this.dependencies.ctx.beginPath();
    if (prevPos) {
      this.dependencies.ctx.moveTo(prevPos.x, prevPos.y);
      this.dependencies.ctx.lineTo(currentPos.x, currentPos.y);
      this.dependencies.ctx.strokeStyle = this.dependencies.currentColor;
      this.dependencies.ctx.lineWidth = this.dependencies.currentLineWidth;
      this.dependencies.ctx.stroke();
    }
  }
}
