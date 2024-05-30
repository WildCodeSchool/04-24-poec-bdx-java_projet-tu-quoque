import { Observable, switchMap } from "rxjs";
import { BaseShape } from "../../../../../../../../../../../../shared/models/class/base-shape";

import { ElementRef } from "@angular/core";
import { CircleShapeEventHandlers } from "../../../../../../../../../../../../shared/models/class/form-class/circle-event-handlers";
import { DrawingUtilitiesService } from "../../../../../../../../../../../../shared/services/drawing/drawing-utilities.service";
import { ColorService } from "../../../../../../../../../../../../shared/services/drawing/color.service";
import { CanvasDependenciesProvider } from "../../../../../../../../../../../../shared/models/class/form-class/canvas-dependencies-provider";

export class CircleShape extends BaseShape {
  private circleShapeEventHandlers: CircleShapeEventHandlers;

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
      redrawAll,
      this.clearAndRedraw.bind(this)
    );

    this.circleShapeEventHandlers = new CircleShapeEventHandlers(dependencies);
  }

  protected drawShape(
    start$: Observable<MouseEvent | TouchEvent>,
    move$: Observable<MouseEvent | TouchEvent>,
    end$: Observable<MouseEvent | TouchEvent>
  ): void {
    const circle$ = start$.pipe(
      switchMap((startEvent: MouseEvent | TouchEvent) => this.circleShapeEventHandlers.handleStartEvent(startEvent, move$, end$))
    );

    this.drawingService.addSubscription(circle$.subscribe());
  }
}
