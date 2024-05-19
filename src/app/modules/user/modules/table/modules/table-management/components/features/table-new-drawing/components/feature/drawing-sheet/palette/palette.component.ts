import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { ColorService } from '../../../../../../../../../../../../shared/services/drawing/color.service';

@Component({
  selector: 'app-palette',
  templateUrl: './palette.component.html',
  styleUrl: './palette.component.scss'
})
export class PaletteComponent implements OnInit {
  constructor(
    private _elementRef: ElementRef, 
    private _renderer: Renderer2, 
    private _colorService: ColorService) {}

  colors: string[] = ['blue', 'green', 'yellow', 'red', 'black'];

  ngOnInit() {
    this.applyPaletteColors();
  }

  applyPaletteColors(): void {
    const paletteElements = this._elementRef.nativeElement.querySelectorAll('.palette button');
    paletteElements.forEach((element: HTMLElement, index: number) => {
      const color = this.colors[index];
      this._renderer.setStyle(element, 'background-color', color);
      element.setAttribute('data-color', color);
    });
  }

  onClick(color: string): void {
    const defaultLineWidth = 2;
    this._colorService.setColor(color, defaultLineWidth);
  }
}
