import { DrawingUtilitiesService } from "../../services/drawing/drawing-utilities.service";

export class DrawingPoint {
    constructor(public x: number, public y: number) {}
  
    static fromEvent(event: MouseEvent | TouchEvent, canvas: HTMLCanvasElement, drawingService: DrawingUtilitiesService): DrawingPoint {
      const coords = drawingService.getCoordinates(canvas, event);
      return new DrawingPoint(coords.x, coords.y);
    }
  
    distanceTo(other: DrawingPoint): number {
      return Math.max(Math.abs(this.x - other.x), Math.abs(this.y - other.y));
    }
  }