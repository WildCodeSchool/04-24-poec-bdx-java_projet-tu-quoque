import { AfterViewInit, Component, ElementRef, Input, OnDestroy, ViewChild } from '@angular/core';
import { ColorService } from '../../../../../../../../../../../shared/services/drawing/color.service';
import { Subscription, map } from 'rxjs';
import { DrawingUtilitiesService } from '../../../../../../../../../../../shared/services/drawing/drawing-utilities.service';
import { CircleSape } from './drawing-utilities/CircleShape';
import { LineShape } from './drawing-utilities/LineShape';
import { SquareShape } from './drawing-utilities/SquareShape';
import { TriangleShape } from './drawing-utilities/TriangleShape';
import { FreeShape } from './drawing-utilities/FreeShape';

@Component({
  selector: 'app-drawing-sheet',
  templateUrl: './drawing-sheet.component.html',
  styleUrl: './drawing-sheet.component.scss'
})
export class DrawingSheetComponent implements AfterViewInit, OnDestroy{
  @ViewChild('canvas', {static: true}) canvasRef!: ElementRef;

  @Input() public width = 400; 
  @Input() public height = 400;

  private _ctx!: CanvasRenderingContext2D;
  private _currentColor: string = 'black';
  private _currentLineWidth: number = 2;
  private _colorSubsciption!: Subscription;
  private _eventSubscriptions: Subscription[] = []; 
  private _drawnPaths: { color: string, lineWidth: number, path: {x: number, y: number}[] }[] = [];

  private _currentShape: string = 'free';

  constructor(
    private _colorService: ColorService,
    private _drawingService: DrawingUtilitiesService
  ) { }

  ngAfterViewInit() {
    const canvas: HTMLCanvasElement = this.canvasRef.nativeElement;
    this._ctx = canvas.getContext('2d')!;
    
    canvas.width = this.width;
    canvas.height = this.height;

    this._ctx.strokeStyle = this._currentColor;
    this._ctx.lineWidth = 2;
    this._ctx.lineCap = 'round';

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
    switch (this._currentShape) {
      case 'free':
        this.drawFree();
        break;
      case 'square':
        this.drawSquare();
        break;
      case 'circle':
        this.drawCircle();
        break;
      case 'triangle':
        this.drawTriangle();
        break;
      case 'line':
        this.drawLine();
        break;
      default:
        this.drawFree();
    }
  }

  drawFree() {
    this._currentShape = 'free';
    const drawFree = new FreeShape(
      this.canvasRef,
      this._drawingService,
      this._colorService,
      this._ctx,
      this.width,
      this.height,
      this._drawnPaths,
      this.redrawAll.bind(this),
      this._currentColor,
      this._currentLineWidth
    );
    drawFree.startDrawing();
  }
  
  drawSquare() {
    this._currentShape = 'square';
    const square = new SquareShape(
      this.canvasRef,
      this._drawingService,
      this._colorService,
      this._ctx,
      this.width,
      this.height,
      this._drawnPaths,
      this.redrawAll.bind(this),
      this._currentColor,
      this._currentLineWidth
    );
    square.startDrawing();
  }
  
  drawCircle() {
    this._currentShape = 'circle';
    const circle = new CircleSape(
      this.canvasRef,
      this._drawingService,
      this._colorService,
      this._ctx,
      this.width,
      this.height,
      this._drawnPaths,
      this.redrawAll.bind(this),
      this._currentColor,
      this._currentLineWidth
    );
    circle.startDrawing();
  }
  
  drawTriangle() {
    this._currentShape = 'triangle';
    const triangle = new TriangleShape(
      this.canvasRef,
      this._drawingService,
      this._colorService,
      this._ctx,
      this.width,
      this.height,
      this._drawnPaths,
      this.redrawAll.bind(this),
      this._currentColor,
      this._currentLineWidth
    );
    triangle.startDrawing();
  }
  
  drawLine() {
    this._currentShape = 'line';
    const line = new LineShape(
      this.canvasRef,
      this._drawingService,
      this._colorService,
      this._ctx,
      this.width,
      this.height,
      this._drawnPaths,
      this.redrawAll.bind(this),
      this._currentColor,
      this._currentLineWidth
    );
    line.startDrawing();
  } 

  setColorAndLineWidth(color: string, lineWidth: number) {
    this._currentColor = color;
    this._currentLineWidth = lineWidth;
    if(this._ctx){
      this._ctx.strokeStyle = color;
      this._ctx.lineWidth = lineWidth;
    }
  }

  undoLastAction() {
    this._drawnPaths.pop();
    this.redrawAll();
  }

  private redrawAll() {
    this._ctx.clearRect(0, 0, this.width, this.height);

    this._drawnPaths.forEach(pathInfo => {
      this._ctx.strokeStyle = pathInfo.color;
      this._ctx.lineWidth = pathInfo.lineWidth;

      const path = pathInfo.path;
      if (path.length > 1) {
        this._ctx.beginPath();
        this._ctx.moveTo(path[0].x, path[0].y);
        for (let i = 1; i < path.length; i++) {
          this._ctx.lineTo(path[i].x, path[i].y);
        }
        this._ctx.stroke();
      }
    });
    
    this._ctx.strokeStyle = this._currentColor;
    this._ctx.lineWidth = this._currentLineWidth;
  }

  eraseAll() {
    const canvas: HTMLCanvasElement = this.canvasRef.nativeElement;
    const context = canvas.getContext('2d');
    if (context) {
      context.clearRect(0, 0, canvas.width, canvas.height);
    }
    this._drawnPaths = [];
    this._eventSubscriptions.forEach(sub => sub.unsubscribe());
    this._eventSubscriptions = [];
    this.captureEvents(canvas);
  }
}
