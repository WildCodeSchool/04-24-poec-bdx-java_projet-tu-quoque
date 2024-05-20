import { ElementRef } from "@angular/core";
import { DrawingUtilitiesService } from "../../../../../../../../../../../../shared/services/drawing/drawing-utilities.service";
import { ColorService } from "../../../../../../../../../../../../shared/services/drawing/color.service";
import { Observable } from "rxjs";

export abstract class BaseShape {
    constructor(
        protected canvasRef: ElementRef,
        protected _drawingService: DrawingUtilitiesService,
        protected _colorService: ColorService,
        protected _ctx: CanvasRenderingContext2D,
        protected width: number,
        protected height: number,
        protected _drawnPaths: { color: string, lineWidth: number, path: { x: number, y: number }[] }[],
        protected redrawAll: () => void
      ) {
        this.initDrawing();
      }

      private initDrawing() {
        this._drawingService.unsubscribeAllEvents();
        const canvas = this.canvasRef.nativeElement;
        const { start$, move$, end$ } = this._drawingService.captureEvents(canvas);
    
        this.drawShape(start$, move$, end$);     
      }

      protected abstract drawShape(
        start$: Observable<MouseEvent | TouchEvent>,
        move$: Observable<MouseEvent | TouchEvent>,
        end$: Observable<MouseEvent | TouchEvent>
      ): void;

      protected clearAndRedraw() {
        this._ctx.clearRect(0, 0, this.width, this.height);
        this.redrawAll();
      }
}