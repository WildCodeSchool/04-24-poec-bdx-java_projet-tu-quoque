import { ElementRef } from "@angular/core";
import { DrawingUtilitiesService } from "../../services/drawing/drawing-utilities.service";
import { ColorService } from "../../services/drawing/color.service";


export class DrawingModel {
    constructor(
      private canvasRef: ElementRef,
      private drawingService: DrawingUtilitiesService,
      private colorService: ColorService,
      private ctx: CanvasRenderingContext2D,
      private width: number,
      private height: number,
      private drawnPaths: { color: string, lineWidth: number, path: {x: number, y: number}[] }[],
      private redrawCallback: () => void,
      private currentColor: string,
      private currentLineWidth: number
    ) {}


    
  }