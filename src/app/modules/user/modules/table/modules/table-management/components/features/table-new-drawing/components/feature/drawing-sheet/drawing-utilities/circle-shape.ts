import { Observable, Subscription, map, switchMap, takeUntil } from "rxjs";
import { BaseShape } from "../../../../../../../../../../../../shared/models/class/base-shape";

export class CircleShape extends BaseShape {
  private radius: number = 0;

  protected drawShape(
    start$: Observable<MouseEvent | TouchEvent>,
    move$: Observable<MouseEvent | TouchEvent>,
    end$: Observable<MouseEvent | TouchEvent>
  ): void {
    const circle$ = start$.pipe(
      switchMap((startEvent: MouseEvent | TouchEvent) => this.handleStartEvent(startEvent, move$, end$))
    );

    this._drawingService.addSubscription(circle$.subscribe());
  }

  private handleStartEvent(
    startEvent: MouseEvent | TouchEvent,
    move$: Observable<MouseEvent | TouchEvent>,
    end$: Observable<MouseEvent | TouchEvent>
  ) {
    const startPos = this._drawingService.getCoordinates(this.canvasRef.nativeElement, startEvent);

    const moveSubscription = move$.pipe(
      map(moveEvent => this.calculateRadiusAndPositions(moveEvent, startPos)),
      takeUntil(end$)
    ).subscribe(({ startPos, currentPos, radius }) => {
      this.radius = radius;
      this.clearAndRedraw();
      this.drawCircle(startPos, this.radius);
    });

    return end$.pipe(
      map(() => this.handleEndEvent(startPos, moveSubscription))
    );
  }

  private calculateRadiusAndPositions(moveEvent: MouseEvent | TouchEvent, startPos: { x: number; y: number }) {
    const currentPos = this._drawingService.getCoordinates(this.canvasRef.nativeElement, moveEvent);
    const radius = Math.sqrt(
      Math.pow(currentPos.x - startPos.x, 2) + Math.pow(currentPos.y - startPos.y, 2)
    );
    return { startPos, currentPos, radius };
  }

  private drawCircle(startPos: { x: number; y: number }, radius: number) {
    this._ctx.strokeStyle = this._currentColor;
    this._ctx.lineWidth = this._currentLineWidth;

    this._ctx.beginPath();
    this._ctx.arc(startPos.x, startPos.y, radius, 0, 2 * Math.PI);
    this._ctx.stroke();
  }

  private handleEndEvent(startPos: { x: number; y: number }, moveSubscription: Subscription) {
    const path = this.generateCirclePath(startPos, this.radius);

    this._drawnPaths.push({
      color: this._currentColor,
      lineWidth: this._currentLineWidth,
      path
    });

    this.redrawAll();
    moveSubscription.unsubscribe();
  }

  private generateCirclePath(center: { x: number; y: number }, radius: number) {
    const path = [];
    const step = 2 * Math.PI / 100;
    for (let theta = 0; theta < 2 * Math.PI; theta += step) {
      path.push({
        x: center.x + radius * Math.cos(theta),
        y: center.y + radius * Math.sin(theta)
      });
    }
    return path;
  }
}
