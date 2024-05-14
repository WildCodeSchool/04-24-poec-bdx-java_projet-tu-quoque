import { Component, ElementRef, EventEmitter, HostListener, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-color-slider',
  templateUrl: './color-slider.component.html',
  styleUrl: './color-slider.component.scss'
})
export class ColorSliderComponent {
  @ViewChild('canvas')
  canvas!: ElementRef<HTMLCanvasElement>;

  @Output()
  color: EventEmitter<string> = new EventEmitter()

    private _ctx!: CanvasRenderingContext2D;
    private _mousedown: boolean = false;
    private _selectedHeight!: number;

  draw(){
    if(!this._ctx) {
      this._ctx = this.canvas.nativeElement.getContext("2d")!;
    }

    const width = this.canvas.nativeElement.width;
    const height = this.canvas.nativeElement.height;

    this._ctx.clearRect(0, 0, width, height);

    const gradient = this._ctx.createLinearGradient(0 ,0 , 0, height);
    gradient.addColorStop(0, 'rgba(255, 0, 0, 1)');
    gradient.addColorStop(0.17, 'rgba(255, 255, 0, 1)');
    gradient.addColorStop(0.34, 'rgba(0, 255, 0, 1)');
    gradient.addColorStop(0.51, 'rgba(0, 255, 255, 1)');
    gradient.addColorStop(0.68, 'rgba(0, 0, 255, 1)');
    gradient.addColorStop(0.85, 'rgba(255, 0, 255, 1)');
    gradient.addColorStop(1, 'rgba(255, 0, 0, 1)');

    this._ctx.beginPath();
    this._ctx.rect(0, 0, width, height);

    this._ctx.fillStyle = gradient;
    this._ctx.fill();
    this._ctx.closePath();

    if (this._selectedHeight) {
      this._ctx.beginPath()
      this._ctx.strokeStyle = "white"
      this._ctx.lineWidth = 5
      this._ctx.rect(0, this._selectedHeight - 5, width, 10)
      this._ctx.stroke()
      this._ctx.closePath()
    }
  }

  ngAfterViewInit() {
    this.draw();
  }

  @HostListener('window:mouseup', ['$event'])
  onMouseUp(event: MouseEvent) {
    this._mousedown = false;
  }
  
  onMouseDown(event: MouseEvent) {
    this._mousedown = true;
    this._selectedHeight = event.offsetY;
    this.draw();
    this.emitColor(event.offsetX, event.offsetY);
  }

  onMouseMove(event: MouseEvent) { 
    if (this._mousedown) {
      this._selectedHeight = event.offsetY;
      this.draw();
      this.emitColor(event.offsetX, event.offsetY);
    }
  }


  emitColor(x: number, y: number) {
    const rgbaColor = this.getColorAtPosition(x,y);
    this.color.emit(rgbaColor);
  }

  getColorAtPosition(x: number, y: number){
    const imageData = this._ctx.getImageData(x, y, 1, 1).data;
    return 'rgba(' + imageData[0] + ',' + imageData[1] + ',' + imageData[2] + ',1)';
  }


}
