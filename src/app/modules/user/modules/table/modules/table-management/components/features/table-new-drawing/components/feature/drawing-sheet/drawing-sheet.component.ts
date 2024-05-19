import { AfterViewInit, Component, ElementRef, Input, OnDestroy, ViewChild } from '@angular/core';
import { ColorService } from '../../../../../../../../../../../shared/services/drawing/color.service';
import { Subscription, fromEvent, map, pairwise, switchMap, takeUntil } from 'rxjs';

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
  private _eventSubscription: Subscription[] = []; 
  private _drawnPaths: { color: string, lineWidth: number, path: {x: number, y: number}[] }[] = [];

  constructor(private _colorService: ColorService) {}

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
    this._eventSubscription.forEach(sub => sub.unsubscribe());
  }

  private captureEvents(canvas: HTMLCanvasElement) {
    this.drawFree();
  }

  drawFree() {
    this.unsubscribeAllEvents();
 const canvas: HTMLCanvasElement = this.canvasRef.nativeElement;

    const draw$ = fromEvent<MouseEvent>(canvas, 'mousedown')
      .pipe(
        switchMap((startEvent) => {
          let path: { x: number, y: number }[] = [];

          const mouseMove$ = fromEvent<MouseEvent>(canvas, 'mousemove').pipe(
            pairwise(),
            map(([prevEvent, currentEvent]) => {
              const rect = canvas.getBoundingClientRect();
              const prevPos = {
                x: prevEvent.clientX - rect.left,
                y: prevEvent.clientY - rect.top
              };
              const currentPos = {
                x: currentEvent.clientX - rect.left,
                y: currentEvent.clientY - rect.top
              };
              return { prevPos, currentPos };
            }),
            takeUntil(fromEvent(canvas, 'mouseup')),
            takeUntil(fromEvent(canvas, 'mouseleave'))
          );

          const mouseMoveSubscription = mouseMove$.subscribe(({ prevPos, currentPos }) => {
            path.push(currentPos);
            this.drawOnCanvas(prevPos, currentPos);
          });

          const mouseUp$ = fromEvent(canvas, 'mouseup').pipe(
            map(() => {
              this._drawnPaths.push({
                color: this._currentColor,
                lineWidth: this._currentLineWidth,
                path
              });
              mouseMoveSubscription.unsubscribe();
            })
          );

          return mouseUp$;
        })
      );

    const drawSubscription = draw$.subscribe();
    this._eventSubscription.push(drawSubscription);
  }

      private drawOnCanvas(
        prevPos: { x: number, y: number }, 
        currentPos: { x: number, y: number }
      ) {
        if (!this._ctx) { 
          return; 
        }
      
        this._ctx.beginPath();
      
        if (prevPos) {
          this._ctx.moveTo(prevPos.x, prevPos.y);
          this._ctx.lineTo(currentPos.x, currentPos.y);
          this._ctx.stroke();
        }
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
    this.unsubscribeAllEvents();
    const canvas: HTMLCanvasElement = this.canvasRef.nativeElement;

    const square$ = fromEvent<MouseEvent>(canvas, 'mousedown')
      .pipe(
        switchMap((startEvent) => {
          const startX = startEvent.clientX - canvas.getBoundingClientRect().left;
          const startY = startEvent.clientY - canvas.getBoundingClientRect().top;

          const mouseMove$ = fromEvent<MouseEvent>(canvas, 'mousemove').pipe(
            map((moveEvent) => {
              const currentX = moveEvent.clientX - canvas.getBoundingClientRect().left;
              const currentY = moveEvent.clientY - canvas.getBoundingClientRect().top;
              return { startX, startY, currentX, currentY };
            }),
            takeUntil(fromEvent(canvas, 'mouseup')),
            takeUntil(fromEvent(canvas, 'mouseleave'))
          );

          const mouseMoveSubscription = mouseMove$.subscribe(({ startX, startY, currentX, currentY }) => {
            this._ctx.clearRect(0, 0, this.width, this.height);
            this.redrawAll();

            const width = currentX - startX;
            const height = currentY - startY;
            
            this._ctx.strokeStyle = this._colorService.getCurrentColor();
            this._ctx.lineWidth = this._colorService.getCurrentLineWidth();

            this._ctx.beginPath();
            this._ctx.rect(startX, startY, width, height);
            this._ctx.stroke();
          });

          const mouseUp$ = fromEvent<MouseEvent>(canvas, 'mouseup').pipe(
            map((endEvent) => {
              const rect = canvas.getBoundingClientRect();
              const startX = startEvent.clientX - rect.left;
              const startY = startEvent.clientY - rect.top;
              const endX = endEvent.clientX - rect.left;
              const endY = endEvent.clientY - rect.top;
              const width = endX - startX;
              const height = endY - startY;

              const path = [
                { x: startX, y: startY },
                { x: startX + width, y: startY },
                { x: startX + width, y: startY + height },
                { x: startX, y: startY + height },
                { x: startX, y: startY }
              ];

              this._drawnPaths.push({
                color: this._currentColor,
                lineWidth: this._currentLineWidth,
                path
              });

              mouseMoveSubscription.unsubscribe();
            })
          );

          return mouseUp$;
        })
      );

    const squareSubscription = square$.subscribe();
    this._eventSubscription.push(squareSubscription);
  }

  private unsubscribeAllEvents() {
    this._eventSubscription.forEach(sub => sub.unsubscribe());
    this._eventSubscription = [];
  }
}
