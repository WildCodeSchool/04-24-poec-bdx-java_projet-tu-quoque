import { Observable, Subscription, map, takeUntil, switchMap } from "rxjs";
import { DrawingUtilitiesService } from "../../../services/drawing/drawing-utilities.service";
import { ElementRef } from "@angular/core";

export class FreeShapeEventHandlers {
  constructor(
    private _drawingService: DrawingUtilitiesService,
    private _ctx: CanvasRenderingContext2D,
    private _currentColor: string,
    private _currentLineWidth: number,
    private _drawnPaths: { color: string, lineWidth: number, path: { x: number, y: number }[] }[],
    private redrawAll: () => void
  ) {}

  handleStartEvent(
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
