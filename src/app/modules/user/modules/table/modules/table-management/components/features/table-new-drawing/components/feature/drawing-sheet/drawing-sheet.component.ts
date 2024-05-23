import { AfterViewInit, Component, ElementRef, Input, OnDestroy, ViewChild } from '@angular/core';
import { ColorService } from '../../../../../../../../../../../shared/services/drawing/color.service';
import { Subscription, map } from 'rxjs';
import { DrawingUtilitiesService } from '../../../../../../../../../../../shared/services/drawing/drawing-utilities.service';
import { DrawingModel } from '../../../../../../../../../../../shared/models/class/drawing-models';
import { CanvasEraseService } from '../../../../../../../../../../../shared/services/drawing/canvas-erase.service';
import { CanvasRedrawService } from '../../../../../../../../../../../shared/services/drawing/canvas-redraw.service';

@Component({
  selector: 'app-drawing-sheet',
  templateUrl: './drawing-sheet.component.html',
  styleUrl: './drawing-sheet.component.scss'
})
export class DrawingSheetComponent implements AfterViewInit, OnDestroy{
  @ViewChild('canvas', {static: true}) canvasRef!: ElementRef;

  @Input() public width = 400; 
  @Input() public height = 400;

  private ctx!: CanvasRenderingContext2D;
  private _currentColor: string = 'black';
  private _currentLineWidth: number = 2;
  private _colorSubsciption!: Subscription;
  private _eventSubscriptions: Subscription[] = []; 
  private _drawnPaths: { color: string, lineWidth: number, path: {x: number, y: number}[] }[] = [];

  private _currentShape: string = 'free';

  constructor(
    private _colorService: ColorService,
    private _drawingService: DrawingUtilitiesService,
    private _canvasEraseService: CanvasEraseService,
    private _canvasRedrawService: CanvasRedrawService
  ) { }

  ngAfterViewInit() {
    const canvas: HTMLCanvasElement = this.canvasRef.nativeElement;
    this.ctx = canvas.getContext('2d')!;
    
    canvas.width = this.width;
    canvas.height = this.height;

    this.ctx.strokeStyle = this._currentColor;
    this.ctx.lineWidth = 2;
    this.ctx.lineCap = 'round';

    this.captureEvents(canvas);

    this._colorSubsciption = this._colorService.color$
    .pipe(
      map(({ color, lineWidth }) => this.setColorAndLineWidth(color, lineWidth))
    )
    .subscribe();
}

  ngOnDestroy(): void {
    if(this._colorSubsciption){
      this._colorSubsciption.unsubscribe();
    }
    this._eventSubscriptions.forEach(sub => sub.unsubscribe());
  }

  private captureEvents(canvas: HTMLCanvasElement) {
    const { start$, move$, end$ } = this._drawingService.captureEvents(canvas);
    this.startCurrentShapeDrawing();
  }

  private startCurrentShapeDrawing() {
    const shape = DrawingModel.createShape(
      this._currentShape,
      this.canvasRef,
      this._drawingService,
      this._colorService,
      this.ctx,
      this.width,
      this.height,
      this._drawnPaths,
      this.redrawAll.bind(this),
      this._currentColor,
      this._currentLineWidth
    );
    shape.startDrawing();
    }
  

  drawFree() {
    this._currentShape = 'free';
    this.startCurrentShapeDrawing();
  }
  
  drawSquare() {
    this._currentShape = 'square';
    this.startCurrentShapeDrawing();
  }
  
  drawCircle() {
    this._currentShape = 'circle';
    this.startCurrentShapeDrawing();
  }
  
  drawTriangle() {
    this._currentShape = 'triangle';
    this.startCurrentShapeDrawing();
  }
  
  drawLine() {
    this._currentShape = 'line';
    this.startCurrentShapeDrawing();
  } 

  setColorAndLineWidth(color: string, lineWidth: number) {
    this._currentColor = color;
    this._currentLineWidth = lineWidth;
    if(this.ctx){
      this.ctx.strokeStyle = color;
      this.ctx.lineWidth = lineWidth;
    }
  }

  undoLastAction() {
    this._drawnPaths.pop();
    this.redrawAll();
  }

  private redrawAll() {
  this._canvasRedrawService.redrawAll(this.ctx, this.width, this.height, this._drawnPaths, this._currentColor, this._currentLineWidth)
  }

  eraseAll() {
  this._canvasEraseService.eraseAll(this.canvasRef, this._drawnPaths, this._eventSubscriptions, this.captureEvents.bind(this));
  }
}
