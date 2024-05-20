import { Injectable } from '@angular/core';

import { Subscription, fromEvent, merge } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DrawingService {
  private subscriptions: Subscription[] = [];

  constructor() { }

  getCoordinates(canvas: HTMLCanvasElement, event: MouseEvent | TouchEvent): { x: number, y: number } {
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
  }

  captureEvents(canvas: HTMLCanvasElement) {
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

    return { start$, move$, end$ };
  }

  addSubscription(subscription: Subscription) {
    this.subscriptions.push(subscription);
  }

  unsubscribeAllEvents() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
    this.subscriptions = [];
  }
}
