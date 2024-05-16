import { Component } from '@angular/core';
import { AbstractSelfFilledComponent } from '../abstract-self-filled-component.component';

@Component({
  selector: 'app-height-auto',
  templateUrl: './height-auto.component.html',
  styleUrl: './height-auto.component.scss'
})
export class HeightAutoComponent extends AbstractSelfFilledComponent {
  protected override label: string = "TAILLE";
  protected override name: string = "height";
  protected override unit: string = "cm";
}
