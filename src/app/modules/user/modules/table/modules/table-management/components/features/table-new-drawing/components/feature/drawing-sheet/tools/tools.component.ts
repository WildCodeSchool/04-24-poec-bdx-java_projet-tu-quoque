import { Component } from '@angular/core';
import { ColorService } from '../../../../../../../../../../../../shared/services/drawing/color.service';
import { DrawingSheetComponent } from '../drawing-sheet.component';

@Component({
  selector: 'app-tools',
  templateUrl: './tools.component.html',
  styleUrl: './tools.component.scss'
})
export class ToolsComponent {

  constructor(private _colorService: ColorService, private _drawingSheet: DrawingSheetComponent){}

  drawfreeIcon:string = 'assets/icons/drawTools/drawfree.svg';
  lineIcon: string = 'assets/icons/drawTools/line.svg';
  circleIcon: string = 'assets/icons/drawTools/circle.svg';
  squareIcon: string = 'assets/icons/drawTools/square.svg';
  triangleIcon: string = 'assets/icons/drawTools/triangle.svg';
  eraseIcon: string = 'assets/icons/drawTools/erase.svg';
  returnIcon: string = 'assets/icons/drawTools/return.svg';

 

  drawLine(){}
  drawTriangle(){}
  drawCirle(){}
  drawSquare(){
    this._drawingSheet.drawSquare();
  }

  errase(){
    const whiteColor = 'white';
    const lineWidthForEraser = 10;
    this._colorService.setColor(whiteColor, lineWidthForEraser);
  }
  
  undoAction(){
    this._drawingSheet.undoLastAction();
  }

}
