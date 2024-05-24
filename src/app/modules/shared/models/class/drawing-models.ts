import { ElementRef } from "@angular/core";
import { DrawingUtilitiesService } from "../../services/drawing/drawing-utilities.service";
import { ColorService } from "../../services/drawing/color.service";
import { SquareShape } from "../../../user/modules/table/modules/table-management/components/features/table-new-drawing/components/feature/drawing-sheet/drawing-utilities/square-shape";
import { FreeShape } from "../../../user/modules/table/modules/table-management/components/features/table-new-drawing/components/feature/drawing-sheet/drawing-utilities/free-shape";
import { LineShape } from "../../../user/modules/table/modules/table-management/components/features/table-new-drawing/components/feature/drawing-sheet/drawing-utilities/line-shape";
import { TriangleShape } from "../../../user/modules/table/modules/table-management/components/features/table-new-drawing/components/feature/drawing-sheet/drawing-utilities/triangle-shape";
import { CircleShape } from "../../../user/modules/table/modules/table-management/components/features/table-new-drawing/components/feature/drawing-sheet/drawing-utilities/circle-shape";


export class DrawingModel {
  static createShape(
    shapeType: string,
    canvasRef: ElementRef,
    drawingUtilitiesService: DrawingUtilitiesService,
    colorservice: ColorService,
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    drawnPaths: { color: string, lineWidth: number, path: { x: number, y: number }[] }[],
    redrawAll: () => void,
    currentColor: string,
    currentLineWidth: number
  ) {
    switch (shapeType) {
      case 'square':
        return new SquareShape(canvasRef, drawingUtilitiesService, colorservice, ctx, width, height, drawnPaths, redrawAll, currentColor, currentLineWidth);
      case 'circle':
        return new CircleShape(canvasRef, drawingUtilitiesService, colorservice, ctx, width, height, drawnPaths, redrawAll, currentColor, currentLineWidth);
      case 'triangle':
        return new TriangleShape(canvasRef, drawingUtilitiesService, colorservice, ctx, width, height, drawnPaths, redrawAll, currentColor, currentLineWidth);
      case 'line':
        return new LineShape(canvasRef, drawingUtilitiesService, colorservice, ctx, width, height, drawnPaths, redrawAll, currentColor, currentLineWidth);
      case 'free':
      default:
        return new FreeShape(canvasRef, drawingUtilitiesService, colorservice, ctx, width, height, drawnPaths, redrawAll, currentColor, currentLineWidth);
    }
  }
}