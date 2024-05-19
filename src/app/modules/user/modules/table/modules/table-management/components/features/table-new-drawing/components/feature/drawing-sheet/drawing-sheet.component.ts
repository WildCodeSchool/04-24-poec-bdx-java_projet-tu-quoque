import { AfterViewInit, Component, ElementRef, Input, OnDestroy, ViewChild } from '@angular/core';
import { ColorService } from '../../../../../../../../../../../shared/services/drawing/color.service';
import { Subscription, fromEvent, map, merge, pairwise, switchMap, takeUntil } from 'rxjs';

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

  private lastMoveEvent!: MouseEvent | TouchEvent;

  constructor(private _colorService: ColorService) { }

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
    this.drawFree();
  }


  drawFree() {
    this.unsubscribeAllEvents();
    const canvas: HTMLCanvasElement = this.canvasRef.nativeElement;

    const start$ = merge(
      fromEvent<MouseEvent>(canvas, 'mousedown'),
      fromEvent<TouchEvent>(canvas, 'touchstart')
    );

    const move$ = merge(
      fromEvent<MouseEvent>(canvas, 'mousemove'),
      fromEvent<TouchEvent>(canvas, 'touchmove')
    );

    const end$ = merge(
      fromEvent<MouseEvent>(canvas, 'mouseup'),
      fromEvent<TouchEvent>(canvas, 'touchend'),
      fromEvent<TouchEvent>(canvas, 'touchcancel')
    );

    const draw$ = start$
      .pipe(
        switchMap((startEvent: MouseEvent | TouchEvent) => {
          let path: { x: number, y: number }[] = [];

          const getCoordinates = (event: MouseEvent | TouchEvent) => {
            const rect = canvas.getBoundingClientRect();
            if (event instanceof MouseEvent) {
              return {
                x: event.clientX - rect.left,
                y: event.clientY - rect.top
              };
            } else {
              return {
                x: event.touches[0].clientX - rect.left,
                y: event.touches[0].clientY - rect.top
              };
            }
          };

          const startPos = getCoordinates(startEvent);
          path.push(startPos);

          const moveSubscription = move$
          .pipe(
            map((moveEvent: MouseEvent | TouchEvent) => 
              getCoordinates(moveEvent)),
              takeUntil(end$)
            )
            .subscribe(currentPos => {
              path.push(currentPos);
              this.drawOnCanvas(path[path.length - 2], currentPos);
            });

          return end$
            .pipe(
              map(() => {
                this._drawnPaths.push({
                  color: this._currentColor,
                  lineWidth: this._currentLineWidth,
                  path
                });
                moveSubscription.unsubscribe();
              })
            );
        })
      );

    const drawSubscription = draw$.subscribe();
    this._eventSubscriptions.push(drawSubscription);
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

  private handleShapeDrawing(start$: any, move$: any, end$: any, drawShape: Function) {
    const canvas: HTMLCanvasElement = this.canvasRef.nativeElement;

    const shape$ = start$
      .pipe(
        switchMap((startEvent: MouseEvent | TouchEvent) => {
          const getCoordinates = (event: MouseEvent | TouchEvent) => {
            const rect = canvas.getBoundingClientRect();
            if (event instanceof MouseEvent) {
              return {
                x: event.clientX - rect.left,
                y: event.clientY - rect.top
              };
            } else {
              return {
                x: event.touches[0].clientX - rect.left,
                y: event.touches[0].clientY - rect.top
              };
            }
          };

          const startPos = getCoordinates(startEvent);

          const moveSubscription = move$
            .pipe(
              map((moveEvent: MouseEvent | TouchEvent) => {
                const currentPos = getCoordinates(moveEvent);
                return { startX: startPos.x, startY: startPos.y, currentX: currentPos.x, currentY: currentPos.y };
              }),
              takeUntil(end$)
            )
            .subscribe(({ startX, startY, currentX, currentY }: { startX: number, startY: number, currentX: number, currentY: number }) => {
              this._ctx.clearRect(0, 0, this.width, this.height);
              this.redrawAll();

              drawShape(startX, startY, currentX, currentY);
            });

          return end$
            .pipe(
              map(() => {
                moveSubscription.unsubscribe();
              })
            );
        })
      );

    const shapeSubscription = shape$.subscribe();
    this._eventSubscriptions.push(shapeSubscription);
  }
  
  drawSquare() {
    this.unsubscribeAllEvents();
    const canvas: HTMLCanvasElement = this.canvasRef.nativeElement;
  
    const start$ = merge(
      fromEvent<MouseEvent>(canvas, 'mousedown'),
      fromEvent<TouchEvent>(canvas, 'touchstart')
    );
  
    const move$ = merge(
      fromEvent<MouseEvent>(canvas, 'mousemove'),
      fromEvent<TouchEvent>(canvas, 'touchmove')
    );
  
    const end$ = merge(
      fromEvent<MouseEvent>(canvas, 'mouseup'),
      fromEvent<TouchEvent>(canvas, 'touchend'),
      fromEvent<TouchEvent>(canvas, 'touchcancel')
    );
  
    const square$ = start$
      .pipe(
        switchMap((startEvent: MouseEvent | TouchEvent) => {
          const getCoordinates = (event: MouseEvent | TouchEvent) => {
            const rect = canvas.getBoundingClientRect();
            if (event instanceof MouseEvent) {
              return {
                x: event.clientX - rect.left,
                y: event.clientY - rect.top
              };
            } else if (event.touches && event.touches.length > 0) {
              return {
                x: event.touches[0].clientX - rect.left,
                y: event.touches[0].clientY - rect.top
              };
            } else {
              return { x: 0, y: 0 };
            }
          };
  
          const startPos = getCoordinates(startEvent);
  
          let squarePath: { x: number; y: number }[] = [];
          squarePath.push(startPos);
  
          let finalPos = startPos;  // Store the final position
  
          const moveSubscription = move$
            .pipe(
              map((moveEvent: MouseEvent | TouchEvent) => {
                const currentPos = getCoordinates(moveEvent);
                finalPos = currentPos;  // Update the final position on each move
                const width = currentPos.x - startPos.x;
                const height = currentPos.y - startPos.y;
                const squareSize = Math.max(Math.abs(width), Math.abs(height));
  
                this._ctx.clearRect(0, 0, this.width, this.height);
                this.redrawAll();
  
                this._ctx.strokeStyle = this._colorService.getCurrentColor();
                this._ctx.lineWidth = this._colorService.getCurrentLineWidth();
                this._ctx.strokeRect(startPos.x, startPos.y, squareSize, squareSize);
  
                return currentPos;
              }),
              takeUntil(end$)
            )
            .subscribe(() => {});
  
          return end$
            .pipe(
              map(() => {
                const width = finalPos.x - startPos.x;
                const height = finalPos.y - startPos.y;
                const squareSize = Math.max(Math.abs(width), Math.abs(height));
  
                this._drawnPaths.push({
                  color: this._currentColor,
                  lineWidth: this._currentLineWidth,
                  path: [
                    { x: startPos.x, y: startPos.y },
                    { x: startPos.x + squareSize, y: startPos.y },
                    { x: startPos.x + squareSize, y: startPos.y + squareSize },
                    { x: startPos.x, y: startPos.y + squareSize },
                    { x: startPos.x, y: startPos.y }
                  ]
                });
  
                this.redrawAll();
                moveSubscription.unsubscribe();
              })
            );
        })
      );
  
    const squareSubscription = square$.subscribe();
    this._eventSubscriptions.push(squareSubscription);
  }
  


  drawCircle() {
    this.unsubscribeAllEvents();
    const canvas: HTMLCanvasElement = this.canvasRef.nativeElement;
  
    const start$ = merge(
      fromEvent<MouseEvent>(canvas, 'mousedown'),
      fromEvent<TouchEvent>(canvas, 'touchstart')
    );
  
    const move$ = merge(
      fromEvent<MouseEvent>(canvas, 'mousemove'),
      fromEvent<TouchEvent>(canvas, 'touchmove')
    );
  
    const end$ = merge(
      fromEvent<MouseEvent>(canvas, 'mouseup'),
      fromEvent<TouchEvent>(canvas, 'touchend'),
      fromEvent<TouchEvent>(canvas, 'touchcancel')
    );
  
    let startPos: { x: number; y: number };
    let radius: number; // Variable pour stocker le rayon
  
    const circle$ = start$
      .pipe(
        switchMap((startEvent: MouseEvent | TouchEvent) => {
          const getCoordinates = (event: MouseEvent | TouchEvent) => {
            const rect = canvas.getBoundingClientRect();
            if (event instanceof MouseEvent) {
              return {
                x: event.clientX - rect.left,
                y: event.clientY - rect.top
              };
            } else {
              return {
                x: event.touches[0].clientX - rect.left,
                y: event.touches[0].clientY - rect.top
              };
            }
          };
  
          startPos = getCoordinates(startEvent);
  
          const moveSubscription = move$
            .pipe(
              map((moveEvent: MouseEvent | TouchEvent) => {
                const currentPos = getCoordinates(moveEvent);
                radius = Math.sqrt(
                  Math.pow(currentPos.x - startPos.x, 2) +
                  Math.pow(currentPos.y - startPos.y, 2)
                );
                return { startPos, currentPos };
              }),
              takeUntil(end$)
            )
            .subscribe(({ startPos, currentPos }) => {
              this._ctx.clearRect(0, 0, this.width, this.height);
              this.redrawAll();
  
              this._ctx.strokeStyle = this._colorService.getCurrentColor();
              this._ctx.lineWidth = this._colorService.getCurrentLineWidth();
  
              this._ctx.beginPath();
              this._ctx.arc(startPos.x, startPos.y, radius, 0, 2 * Math.PI);
              this._ctx.stroke();
            });
  
          return end$
            .pipe(
              map(() => {
                const centerX = startPos.x;
                const centerY = startPos.y;
  
                const path = [];
                const step = 2 * Math.PI / 100;
                for (let theta = 0; theta < 2 * Math.PI; theta += step) {
                  path.push({
                    x: centerX + radius * Math.cos(theta),
                    y: centerY + radius * Math.sin(theta)
                  });
                }
  
                this._drawnPaths.push({
                  color: this._currentColor,
                  lineWidth: this._currentLineWidth,
                  path
                });
  
                this.redrawAll();
                moveSubscription.unsubscribe();
              })
            );
        })
      );
  
    const circleSubscription = circle$.subscribe();
    this._eventSubscriptions.push(circleSubscription);
  }
  
  drawTriangle() {
    this.unsubscribeAllEvents();
    const canvas: HTMLCanvasElement = this.canvasRef.nativeElement;
  
    const start$ = merge(
      fromEvent<MouseEvent>(canvas, 'mousedown'),
      fromEvent<TouchEvent>(canvas, 'touchstart')
    );
  
    const move$ = merge(
      fromEvent<MouseEvent>(canvas, 'mousemove'),
      fromEvent<TouchEvent>(canvas, 'touchmove')
    );
  
    const end$ = merge(
      fromEvent<MouseEvent>(canvas, 'mouseup'),
      fromEvent<TouchEvent>(canvas, 'touchend'),
      fromEvent<TouchEvent>(canvas, 'touchcancel')
    );
  
    const getCoordinates = (event: MouseEvent | TouchEvent) => {
      const rect = canvas.getBoundingClientRect();
      if (event instanceof MouseEvent) {
        return {
          x: event.clientX - rect.left,
          y: event.clientY - rect.top
        };
      } else if (event.touches && event.touches.length > 0) {
        return {
          x: event.touches[0].clientX - rect.left,
          y: event.touches[0].clientY - rect.top
        };
      } else {
        return { x: 0, y: 0 };
      }
    };
  
    const triangle$ = start$
      .pipe(
        switchMap((startEvent: MouseEvent | TouchEvent) => {
          const startPos = getCoordinates(startEvent);
          let lastMovePos = { ...startPos }; // Keep track of the last move position
  
          const moveSubscription = move$
            .pipe(
              map((moveEvent: MouseEvent | TouchEvent) => {
                const currentPos = getCoordinates(moveEvent);
                lastMovePos = currentPos; // Update last move position
                return { startX: startPos.x, startY: startPos.y, currentX: currentPos.x, currentY: currentPos.y };
              }),
              takeUntil(end$)
            )
            .subscribe(({ startX, startY, currentX, currentY }) => {
              this._ctx.clearRect(0, 0, this.width, this.height);
              this.redrawAll();
  
              const height = currentY - startY;
              const width = currentX - startX;
  
              this._ctx.strokeStyle = this._colorService.getCurrentColor();
              this._ctx.lineWidth = this._colorService.getCurrentLineWidth();
  
              this._ctx.beginPath();
              this._ctx.moveTo(startX, startY);
              this._ctx.lineTo(startX + width / 2, startY + height);
              this._ctx.lineTo(startX - width / 2, startY + height);
              this._ctx.closePath();
              this._ctx.stroke();
            });
  
          return end$
            .pipe(
              map((endEvent: MouseEvent | TouchEvent) => {
                const currentPos = lastMovePos; // Use the last move position
                const height = currentPos.y - startPos.y;
                const width = currentPos.x - startPos.x;
  
                const path = [
                  { x: startPos.x, y: startPos.y },
                  { x: startPos.x + width / 2, y: startPos.y + height },
                  { x: startPos.x - width / 2, y: startPos.y + height },
                  { x: startPos.x, y: startPos.y }
                ];
  
                this._drawnPaths.push({
                  color: this._currentColor,
                  lineWidth: this._currentLineWidth,
                  path
                });
  
                this.redrawAll();
                moveSubscription.unsubscribe();
              })
            );
        })
      );
  
    const triangleSubscription = triangle$.subscribe();
    this._eventSubscriptions.push(triangleSubscription);
  }
  
  
  
  drawLine() {
    this.unsubscribeAllEvents();
    const canvas: HTMLCanvasElement = this.canvasRef.nativeElement;

    const start$ = merge(
      fromEvent<MouseEvent>(canvas, 'mousedown'),
      fromEvent<TouchEvent>(canvas, 'touchstart')
    );

    const move$ = merge(
      fromEvent<MouseEvent>(canvas, 'mousemove'),
      fromEvent<TouchEvent>(canvas, 'touchmove')
    );

    const end$ = merge(
      fromEvent<MouseEvent>(canvas, 'mouseup'),
      fromEvent<TouchEvent>(canvas, 'touchend'),
      fromEvent<TouchEvent>(canvas, 'touchcancel')
    );

    const line$ = start$
      .pipe(
        switchMap((startEvent: MouseEvent | TouchEvent) => {
          const getCoordinates = (event: MouseEvent | TouchEvent) => {
            const rect = canvas.getBoundingClientRect();
            if (event instanceof MouseEvent) {
              return {
                x: event.clientX - rect.left,
                y: event.clientY - rect.top
              };
            } else {
              return {
                x: event.touches[0].clientX - rect.left,
                y: event.touches[0].clientY - rect.top
              };
            }
          };

          const startPos = getCoordinates(startEvent);
          let currentX: number;
          let currentY: number;

          const moveSubscription = move$
            .pipe(
              map((moveEvent: MouseEvent | TouchEvent) => {
                const currentPos = getCoordinates(moveEvent);
                currentX = currentPos.x; // Stockez les coordonnées actuelles
                currentY = currentPos.y;
                return { startX: startPos.x, startY: startPos.y, currentX: currentPos.x, currentY: currentPos.y };
              }),
              takeUntil(end$)
            )
            .subscribe(({ startX, startY, currentX, currentY }) => {
              this._ctx.clearRect(0, 0, this.width, this.height);
              this.redrawAll();

              this._ctx.strokeStyle = this._colorService.getCurrentColor();
              this._ctx.lineWidth = this._colorService.getCurrentLineWidth();

              this._ctx.beginPath();
              this._ctx.moveTo(startX, startY);
              this._ctx.lineTo(currentX, currentY);
              this._ctx.stroke();
            });

          return end$
            .pipe(
              map(() => {
                const path = [
                  { x: startPos.x, y: startPos.y },
                  { x: currentX, y: currentY } 
                ];

                this._drawnPaths.push({
                  color: this._currentColor,
                  lineWidth: this._currentLineWidth,
                  path
                });

                this.redrawAll();
                moveSubscription.unsubscribe();
              })
            );
        })
      );

    const lineSubscription = line$.subscribe();
    this._eventSubscriptions.push(lineSubscription);
  }

  private unsubscribeAllEvents() {
    this._eventSubscriptions.forEach(sub => sub.unsubscribe());
    this._eventSubscriptions = [];
  }
}
