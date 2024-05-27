import { ElementRef } from "@angular/core";
import { DrawingUtilitiesService } from "../../../services/drawing/drawing-utilities.service";

export class CanvasDependenciesProvider {
    constructor(
        public canvasRef: ElementRef,
        public drawingService: DrawingUtilitiesService,
        public ctx: CanvasRenderingContext2D,
        public currentColor: string,
        public currentLineWidth: number,
        public drawnPaths: { color: string, lineWidth: number, path: { x: number, y: number }[] }[],
        public redrawAll: () => void,
        public clearAndRedraw: () => void
      ) {}
}