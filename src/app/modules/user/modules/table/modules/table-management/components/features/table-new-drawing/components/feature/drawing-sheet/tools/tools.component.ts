import { Component } from '@angular/core';
import { ColorService } from '../../../../../../../../../../../../shared/services/drawing/color.service';
import { DrawingSheetComponent } from '../drawing-sheet.component';
import { fromEvent } from 'rxjs';
import { DrawingUtilitiesService } from '../../../../../../../../../../../../shared/services/drawing/drawing-utilities.service';

@Component({
  selector: 'app-tools',
  templateUrl: './tools.component.html',
  styleUrl: './tools.component.scss'
})
export class ToolsComponent {

  private previousColor: string;
  private previousLineWidth: number;

  constructor(
    private _colorService: ColorService, 
    private _drawingSheet: DrawingSheetComponent,
    private _drawingService : DrawingUtilitiesService
  ) {
    this.previousColor = this._colorService.getCurrentColor();
    this.previousLineWidth = this._colorService.getCurrentLineWidth();
  }

  drawfreeIcon:string = 'assets/icons/drawTools/drawfree.svg';
  lineIcon: string = 'assets/icons/drawTools/line.svg';
  circleIcon: string = 'assets/icons/drawTools/circle.svg';
  squareIcon: string = 'assets/icons/drawTools/square.svg';
  triangleIcon: string = 'assets/icons/drawTools/triangle.svg';
  eraseIcon: string = 'assets/icons/drawTools/erase.svg';
  returnIcon: string = 'assets/icons/drawTools/return.svg';
  resetIcon: string = 'assets/icons/drawTools/reset.svg';

  drawFree() {
    this.restorePreviousSettings();
    const canvas = this._drawingSheet.canvasRef.nativeElement;
    const { start$, move$, end$ } = this._drawingService.captureEvents(canvas);
    this._drawingSheet.drawFree();
  }

  drawLine(){
    this.restorePreviousSettings();
    this._drawingSheet.drawLine();
  }

  drawTriangle(){
    this.restorePreviousSettings();
    this._drawingSheet.drawTriangle();
  }

  drawCirle(){
    this.restorePreviousSettings();
    this._drawingSheet.drawCircle();
  }

  drawSquare(){
    this.restorePreviousSettings();
    this._drawingSheet.drawSquare();
  }

  erase(){
    const whiteColor = 'white';
    const lineWidthForEraser = 10;
    this._colorService.setColor(whiteColor, lineWidthForEraser);
    
    const canvas = this._drawingSheet.canvasRef.nativeElement;
    const { start$, move$, end$ } = this._drawingService.captureEvents(canvas);
    this._drawingSheet.drawFree();
  }
  
  undoAction(){
    this._drawingSheet.undoLastAction();
  }

  private restorePreviousSettings(){ 
  this._colorService.setColor(this.previousColor, this.previousLineWidth);
  }

  eraseAll(){
    this._drawingSheet.eraseAll();
  }
}
