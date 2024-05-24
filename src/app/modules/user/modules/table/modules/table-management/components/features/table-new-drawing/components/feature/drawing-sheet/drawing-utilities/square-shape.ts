import { Observable, Subscription, map, switchMap, takeUntil } from "rxjs";
import { BaseShape } from "../../../../../../../../../../../../shared/models/class/base-shape";
import { DrawingPoint } from "../../../../../../../../../../../../shared/models/class/drawing-point";
import { SquareEventHandlers } from "../../../../../../../../../../../../shared/models/class/form-class/square-event-handlers";
import { ElementRef } from "@angular/core";
import { DrawingUtilitiesService } from "../../../../../../../../../../../../shared/services/drawing/drawing-utilities.service";
import { ColorService } from "../../../../../../../../../../../../shared/services/drawing/color.service";

export class SquareShape extends BaseShape {
  private squareEventHandlers: SquareEventHandlers;

  constructor(
    canvasRef: ElementRef,
    _drawingService: DrawingUtilitiesService,
    _colorService: ColorService,
    _ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    _drawnPaths: { color: string, lineWidth: number, path: { x: number, y: number }[] }[],
    redrawAll: () => void,
    currentColor: string,
    currentLineWidth: number
  ) {
    super(canvasRef, _drawingService, _colorService, _ctx, width, height, _drawnPaths, redrawAll, currentColor, currentLineWidth);
    this.squareEventHandlers = new SquareEventHandlers(
      canvasRef,
      _drawingService,
      _ctx,
      currentColor,
      currentLineWidth,
      _drawnPaths,
      this.clearAndRedraw.bind(this),
      redrawAll
    );
  }

  protected drawShape(
    start$: Observable<MouseEvent | TouchEvent>,
    move$: Observable<MouseEvent | TouchEvent>,
    end$: Observable<MouseEvent | TouchEvent>
  ): void {
    const square$ = start$.pipe(
      switchMap(startEvent => this.squareEventHandlers.handleStartEvent(startEvent, move$, end$))
    );

    this._drawingService.addSubscription(square$.subscribe());
  }
}
