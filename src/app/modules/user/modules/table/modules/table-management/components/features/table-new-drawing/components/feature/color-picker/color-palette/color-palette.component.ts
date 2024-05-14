import { AfterViewInit, Component, ElementRef, EventEmitter, HostListener, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';

@Component({
  selector: 'app-color-palette',
  templateUrl: './color-palette.component.html',
  styleUrl: './color-palette.component.scss'
})
export class ColorPaletteComponent implements AfterViewInit, OnChanges {

  @Input()
  hue!: string

  @Output()
  color: EventEmitter<string> = new EventEmitter(true)

  @ViewChild('canvas')
  canvas!: ElementRef<HTMLCanvasElement>

  private _ctx!: CanvasRenderingContext2D

  private mousedown: boolean = false

  public _selectedPosition!: { x: number; y: number }

  ngAfterViewInit() {
    this.draw()
  }

  draw() {
    if (!this._ctx) {
      this._ctx = this.canvas.nativeElement.getContext('2d')!
    }
    const width = this.canvas.nativeElement.width
    const height = this.canvas.nativeElement.height

    this._ctx.fillStyle = this.hue || 'rgba(255,255,255,1)'
    this._ctx.fillRect(0, 0, width, height)

    const whiteGrad = this._ctx.createLinearGradient(0, 0, width, 0)
    whiteGrad.addColorStop(0, 'rgba(255,255,255,1)')
    whiteGrad.addColorStop(1, 'rgba(255,255,255,0)')

    this._ctx.fillStyle = whiteGrad
    this._ctx.fillRect(0, 0, width, height)

    const blackGrad = this._ctx.createLinearGradient(0, 0, 0, height)
    blackGrad.addColorStop(0, 'rgba(0,0,0,0)')
    blackGrad.addColorStop(1, 'rgba(0,0,0,1)')

    this._ctx.fillStyle = blackGrad
    this._ctx.fillRect(0, 0, width, height)

    if (this._selectedPosition) {
      this._ctx.strokeStyle = 'white'
      this._ctx.fillStyle = 'white'
      this._ctx.beginPath()
      this._ctx.arc(
        this._selectedPosition.x,
        this._selectedPosition.y,
        10,
        0,
        2 * Math.PI
      )
      this._ctx.lineWidth = 5
      this._ctx.stroke()
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['hue']) {
      this.draw()
      const pos = this._selectedPosition
      if (pos) {
        this.color.emit(this.getColorAtPosition(pos.x, pos.y))
      }
    }
  }

  @HostListener('window:mouseup', ['$event'])
  onMouseUp(evt: MouseEvent) {
    this.mousedown = false
  }

  onMouseDown(evt: MouseEvent) {
    this.mousedown = true
    this._selectedPosition = { x: evt.offsetX, y: evt.offsetY }
    this.draw()
    this.color.emit(this.getColorAtPosition(evt.offsetX, evt.offsetY))
  }

  onMouseMove(evt: MouseEvent) {
    if (this.mousedown) {
      this._selectedPosition = { x: evt.offsetX, y: evt.offsetY }
      this.draw()
      this.emitColor(evt.offsetX, evt.offsetY)
    }
  }

  emitColor(x: number, y: number) {
    const rgbaColor = this.getColorAtPosition(x, y)
    this.color.emit(rgbaColor)
  }

  getColorAtPosition(x: number, y: number) {
    const imageData = this._ctx.getImageData(x, y, 1, 1).data
    return (
      'rgba(' + imageData[0] + ',' + imageData[1] + ',' + imageData[2] + ',1)'
    )
  }
}
