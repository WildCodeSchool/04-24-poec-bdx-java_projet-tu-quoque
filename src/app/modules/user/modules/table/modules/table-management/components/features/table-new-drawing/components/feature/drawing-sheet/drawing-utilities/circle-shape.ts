import { Observable, Subscription, map, switchMap, takeUntil } from "rxjs";
import { BaseShape } from "../../../../../../../../../../../../shared/models/class/base-shape";
import { CircleShapeEventHandlers } from "../../../../../../../../../../../../shared/models/class/form-class/circle-event-handlers";
import { ElementRef } from "@angular/core";
import { DrawingUtilitiesService } from "../../../../../../../../../../../../shared/services/drawing/drawing-utilities.service";
import { ColorService } from "../../../../../../../../../../../../shared/services/drawing/color.service";

export class CircleShape extends BaseShape {
  private circleShapeEventHandlers: CircleShapeEventHandlers;
  private radius: number = 0;

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
    this.circleShapeEventHandlers = new CircleShapeEventHandlers(
      canvasRef,
      _drawingService,
      _ctx,
      currentColor,
      currentLineWidth,
      _drawnPaths,
      redrawAll,
      this.clearAndRedraw.bind(this),
      this.radius
    );
  }

  protected drawShape(
    start$: Observable<MouseEvent | TouchEvent>,
    move$: Observable<MouseEvent | TouchEvent>,
    end$: Observable<MouseEvent | TouchEvent>
  ): void {
    const canvas: HTMLCanvasElement = this.canvasRef.nativeElement;
    const circle$ = start$.pipe(
      switchMap((startEvent: MouseEvent | TouchEvent) => this.circleShapeEventHandlers.handleStartEvent(startEvent, canvas, move$, end$))
    );

    this._drawingService.addSubscription(circle$.subscribe());
  }
}
