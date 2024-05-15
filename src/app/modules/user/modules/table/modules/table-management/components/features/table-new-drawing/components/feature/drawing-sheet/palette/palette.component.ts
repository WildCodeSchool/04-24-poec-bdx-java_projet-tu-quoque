import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-palette',
  templateUrl: './palette.component.html',
  styleUrl: './palette.component.scss'
})
export class PaletteComponent implements OnInit {
  constructor(private _elementRef: ElementRef, private renderer: Renderer2) {}

  applyPaletteColors(): void {
    const paletteElements = this._elementRef.nativeElement.querySelectorAll('.palette div');
    paletteElements.forEach((element: HTMLElement) => {
      const color = element.getAttribute('data-color');
      if (color) {
        this.renderer.setStyle(element, 'background-color', color);
      }
    });
  }

  ngOnInit() {
    this.applyPaletteColors();
  }





}
