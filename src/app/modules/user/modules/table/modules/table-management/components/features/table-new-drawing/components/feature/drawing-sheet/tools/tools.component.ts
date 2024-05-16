import { Component } from '@angular/core';
import { ColorService } from '../../../../../../../../../../../../shared/services/drawing/color.service';

@Component({
  selector: 'app-tools',
  templateUrl: './tools.component.html',
  styleUrl: './tools.component.scss'
})
export class ToolsComponent {

  constructor(private _colorService: ColorService ){}

  lineIcon: string = 'assets/icons/drawTools/line.svg';
  circleIcon: string = 'assets/icons/drawTools/circle.svg';
  squareIcon: string = 'assets/icons/drawTools/square.svg';
  triangleIcon: string = 'assets/icons/drawTools/triangle.svg';
  eraseIcon: string = 'assets/icons/drawTools/erase.svg';
  returnIcon: string = 'assets/icons/drawTools/return.svg';

  
  drawLine(){}
  drawTriangle(){}
  drawCirle(){}
  drawSquare(){}

  errase(color: string){
    this._colorService.setColor(color);
  }
  
  return(){}

}
