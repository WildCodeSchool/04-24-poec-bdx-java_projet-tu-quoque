import { ElementRef } from "@angular/core";
import { DrawingUtilitiesService } from "../../services/drawing/drawing-utilities.service";
import { ColorService } from "../../services/drawing/color.service";
import { SquareShape } from "../../../user/modules/table/modules/table-management/components/features/table-new-drawing/components/feature/drawing-sheet/drawing-utilities/SquareShape";
import { FreeShape } from "../../../user/modules/table/modules/table-management/components/features/table-new-drawing/components/feature/drawing-sheet/drawing-utilities/FreeShape";
import { LineShape } from "../../../user/modules/table/modules/table-management/components/features/table-new-drawing/components/feature/drawing-sheet/drawing-utilities/LineShape";
import { TriangleShape } from "../../../user/modules/table/modules/table-management/components/features/table-new-drawing/components/feature/drawing-sheet/drawing-utilities/TriangleShape";
import { CircleShape } from "../../../user/modules/table/modules/table-management/components/features/table-new-drawing/components/feature/drawing-sheet/drawing-utilities/CircleShape";


export class DrawingModel {
    static createShape (
      shapeType: string,
      canvasRef: ElementRef,
      _drawingUtilitiesService: DrawingUtilitiesService,
      _colorservice: ColorService,
      ctx: CanvasRenderingContext2D,
      width: number, 
      height: number,
      drawnPaths: { color: string, lineWidth: number, path: {x: number, y: number}[] }[],
      redrawAll: () => void,
      currentColor: string,
      currentLineWidth: number
    ) {
      switch (shapeType) {
        case 'square':
          return new SquareShape(canvasRef, _drawingUtilitiesService, _colorservice, ctx, width, height, drawnPaths, redrawAll, currentColor, currentLineWidth);
        case 'circle':
          return new CircleShape(canvasRef, _drawingUtilitiesService, _colorservice, ctx, width, height, drawnPaths, redrawAll, currentColor, currentLineWidth);
        case 'triangle':
          return new TriangleShape(canvasRef, _drawingUtilitiesService, _colorservice, ctx, width, height, drawnPaths, redrawAll, currentColor, currentLineWidth);
        case 'line':
          return new LineShape(canvasRef, _drawingUtilitiesService, _colorservice, ctx, width, height, drawnPaths, redrawAll, currentColor, currentLineWidth);
        case 'free':
        default:
          return new FreeShape(canvasRef, _drawingUtilitiesService, _colorservice, ctx, width, height, drawnPaths, redrawAll, currentColor, currentLineWidth);
      }
    }   
  }