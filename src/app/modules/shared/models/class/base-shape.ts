import { ElementRef, inject } from "@angular/core";
import { DrawingUtilitiesService } from "../../services/drawing/drawing-utilities.service";
import { ColorService } from "../../services/drawing/color.service";
import { Observable, Subscription } from "rxjs";
import { DrawingService } from "../../services/drawing/drawing.service";

export abstract class BaseShape {
  protected currentColor: string = "black";
  protected currentLineWidth: number = 2;
  private _colorSubscription!: Subscription;

    constructor(
        protected canvasRef: ElementRef,
        protected drawingService: DrawingUtilitiesService,
        protected colorService: ColorService,
        protected ctx: CanvasRenderingContext2D,
        protected width: number,
        protected height: number,
        protected drawnPaths: { color: string, lineWidth: number, path: { x: number, y: number }[] }[],
        protected redrawAll: () => void,
        currentColor: string,
        currentLineWidth: number
      ) {
        this.currentColor = currentColor;
        this.currentLineWidth = currentLineWidth;
        this.startDrawing();
        this.subscribeToColorChanges();
      }
      
      public startDrawing() {
        this.drawingService.unsubscribeAllEvents();
        const canvas = this.canvasRef.nativeElement;
        const { start$, move$, end$ } = this.drawingService.captureEvents(canvas);
        this.drawShape(start$, move$, end$);       
      }

      private subscribeToColorChanges() {
        this._colorSubscription = this.colorService.color$.subscribe(({ color, lineWidth }) => {
            this.currentColor = color;
            this.currentLineWidth = lineWidth;
            this.ctx.strokeStyle = color;
            this.ctx.lineWidth = lineWidth;
        });
    }
    
      protected abstract drawShape(
        start$: Observable<MouseEvent | TouchEvent>,
        move$: Observable<MouseEvent | TouchEvent>,
        end$: Observable<MouseEvent | TouchEvent>
      ): void;

      protected clearAndRedraw() {
        this.ctx.clearRect(0, 0, this.width, this.height);
        this.redrawAll();
      }
}