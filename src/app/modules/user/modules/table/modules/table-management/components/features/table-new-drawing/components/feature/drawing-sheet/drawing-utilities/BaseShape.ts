import { ElementRef } from "@angular/core";
import { DrawingUtilitiesService } from "../../../../../../../../../../../../shared/services/drawing/drawing-utilities.service";
import { ColorService } from "../../../../../../../../../../../../shared/services/drawing/color.service";
import { Observable, Subscription } from "rxjs";

export abstract class BaseShape {
  protected _currentColor: string = "black";
  protected _currentLineWidth: number = 2;
  private colorSubscription!: Subscription;

    constructor(
        protected canvasRef: ElementRef,
        protected _drawingService: DrawingUtilitiesService,
        protected _colorService: ColorService,
        protected _ctx: CanvasRenderingContext2D,
        protected width: number,
        protected height: number,
        protected _drawnPaths: { color: string, lineWidth: number, path: { x: number, y: number }[] }[],
        protected redrawAll: () => void,
        currentColor: string,
        currentLineWidth: number
      ) {
        this.startDrawing();
        this.subscribeToColorChanges();
      }
      

      public startDrawing() {
        this._drawingService.unsubscribeAllEvents();
        const canvas = this.canvasRef.nativeElement;
        const { start$, move$, end$ } = this._drawingService.captureEvents(canvas);
        this.drawShape(start$, move$, end$);       
      }

      private subscribeToColorChanges() {
        this.colorSubscription = this._colorService.color$.subscribe(({ color, lineWidth }) => {
            this._currentColor = color;
            this._currentLineWidth = lineWidth;
            this._ctx.strokeStyle = color;
            this._ctx.lineWidth = lineWidth;
        });
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