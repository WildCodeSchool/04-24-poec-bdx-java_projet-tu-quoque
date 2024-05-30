import { Observable, Subscription, map, switchMap, takeUntil } from "rxjs";
import { BaseShape } from "../../../../../../../../../../../../shared/models/class/base-shape";
import { DrawingUtilitiesService } from "../../../../../../../../../../../../shared/services/drawing/drawing-utilities.service";
import { ColorService } from "../../../../../../../../../../../../shared/services/drawing/color.service";
import { ElementRef } from "@angular/core";
import { LineEventHandlers } from "../../../../../../../../../../../../shared/models/class/form-class/line-event-handlers";
import { CanvasDependenciesProvider } from "../../../../../../../../../../../../shared/models/class/form-class/canvas-dependencies-provider";


export class LineShape extends BaseShape {
  private lineEventHandlers: LineEventHandlers;

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
    this.lineEventHandlers = new LineEventHandlers(dependencies);
  }

  protected drawShape(
    start$: Observable<MouseEvent | TouchEvent>,
    move$: Observable<MouseEvent | TouchEvent>,
    end$: Observable<MouseEvent | TouchEvent>
  ): void {
    const line$ = start$.pipe(
      switchMap(startEvent => this.lineEventHandlers.handleStartEvent(startEvent, move$, end$))
    );

    this.drawingService.addSubscription(line$.subscribe());
  }
}
