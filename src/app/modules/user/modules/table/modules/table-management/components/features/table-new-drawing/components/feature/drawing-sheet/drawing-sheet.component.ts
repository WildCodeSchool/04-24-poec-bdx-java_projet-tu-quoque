import { AfterViewInit, Component, ElementRef, Input, OnDestroy, ViewChild } from '@angular/core';
import { ColorService } from '../../../../../../../../../../../shared/services/drawing/color.service';
import { Observable, Subscription, fromEvent, map, merge, pairwise, switchMap, takeUntil } from 'rxjs';
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
    this.drawFree();
  }

  drawFree() {
    new FreeShape(
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
    )
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
  
  drawSquare() {
    new SquareShape(
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
  }
  
  drawCircle() {
    new CircleSape(
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
    )
  }
  
  drawTriangle() {
    new TriangleShape(
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
  }
  
  drawLine() {
    new LineShape(
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
    )
  } 

  eraseAll() {
    const canvas: HTMLCanvasElement = this.canvasRef.nativeElement;
    const context = canvas.getContext('2d');
    if (context) {
      context.clearRect(0, 0, canvas.width, canvas.height);
      this._drawnPaths = [];
    }
  }
}
