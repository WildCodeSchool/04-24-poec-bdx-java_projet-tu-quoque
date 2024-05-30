import { Observable, Subscription, map, switchMap, takeUntil } from "rxjs";
import { BaseShape } from "../../../../../../../../../../../../shared/models/class/base-shape";
import { DrawingPoint } from "../../../../../../../../../../../../shared/models/class/drawing-point";
import { SquareEventHandlers } from "../../../../../../../../../../../../shared/models/class/form-class/square-event-handlers";
import { ElementRef } from "@angular/core";
import { DrawingUtilitiesService } from "../../../../../../../../../../../../shared/services/drawing/drawing-utilities.service";
import { ColorService } from "../../../../../../../../../../../../shared/services/drawing/color.service";
import { CanvasDependenciesProvider } from "../../../../../../../../../../../../shared/models/class/form-class/canvas-dependencies-provider";

export class SquareShape extends BaseShape {
  private squareEventHandlers: SquareEventHandlers;

  constructor(
    canvasRef: ElementRef,
    drawingService: DrawingUtilitiesService,
    colorService: ColorService,
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    drawnPaths: { color: string, lineWidth: number, path: { x: number, y: number }[] }[],
    redrawAll: () => void,
    currentColor: string,
    currentLineWidth: number
  ) {
    super(canvasRef, drawingService, colorService, ctx, width, height, drawnPaths, redrawAll, currentColor, currentLineWidth);
    
    const dependencies = new CanvasDependenciesProvider(
      canvasRef,
      drawingService,
      ctx,
      currentColor,
      currentLineWidth,
      drawnPaths,
      this.clearAndRedraw.bind(this),
      redrawAll
    );
    this.squareEventHandlers = new SquareEventHandlers(dependencies);
  }

  protected drawShape(
    start$: Observable<MouseEvent | TouchEvent>,
    move$: Observable<MouseEvent | TouchEvent>,
    end$: Observable<MouseEvent | TouchEvent>
  ): void {
    const square$ = start$.pipe(
      switchMap(startEvent => this.squareEventHandlers.handleStartEvent(startEvent, move$, end$))
    );

    this.drawingService.addSubscription(square$.subscribe());
  }
}
