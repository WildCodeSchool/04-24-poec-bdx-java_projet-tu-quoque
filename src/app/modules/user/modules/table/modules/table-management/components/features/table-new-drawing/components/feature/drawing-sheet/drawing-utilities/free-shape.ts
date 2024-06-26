import { Observable, Subscription, map, switchMap, takeUntil } from "rxjs";
import { BaseShape } from "../../../../../../../../../../../../shared/models/class/base-shape";
import { FreeShapeEventHandlers } from "../../../../../../../../../../../../shared/models/class/form-class/free-sheet-handlers";
import { ElementRef } from "@angular/core";
import { DrawingUtilitiesService } from "../../../../../../../../../../../../shared/services/drawing/drawing-utilities.service";
import { ColorService } from "../../../../../../../../../../../../shared/services/drawing/color.service";
import { CanvasDependenciesProvider } from "../../../../../../../../../../../../shared/models/class/form-class/canvas-dependencies-provider";

export class FreeShape extends BaseShape {
  private freeShapeEventHandlers: FreeShapeEventHandlers;

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
    this.freeShapeEventHandlers = new FreeShapeEventHandlers(dependencies);
  }

  public drawShape(
    start$: Observable<MouseEvent | TouchEvent>,
    move$: Observable<MouseEvent | TouchEvent>,
    end$: Observable<MouseEvent | TouchEvent>
  ): void {
    const canvas: HTMLCanvasElement = this.canvasRef.nativeElement;
    const draw$ = start$.pipe(
      switchMap((startEvent: MouseEvent | TouchEvent) => this.freeShapeEventHandlers.handleStartEvent(startEvent, canvas, move$, end$))
    );

    const drawSubscription = draw$.subscribe();
    this.drawingService.addSubscription(drawSubscription);
  }
}
