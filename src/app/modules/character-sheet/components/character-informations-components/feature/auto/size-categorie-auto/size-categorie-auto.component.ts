import { Component } from '@angular/core';
import { AbstractSelfFilledComponent } from '../abstract-self-filled-component.component';

@Component({
  selector: 'app-size-categorie-auto',
  templateUrl: './size-categorie-auto.component.html',
  styleUrl: './size-categorie-auto.component.scss'
})
export class SizeCategorieAutoComponent extends AbstractSelfFilledComponent {
  protected override label: string = "CATEGORIE DE TAILLE";
  protected override name: string = "sizeCategory";
}
