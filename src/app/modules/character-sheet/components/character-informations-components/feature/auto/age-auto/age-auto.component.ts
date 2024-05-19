import { Component } from '@angular/core';
import { AbstractSelfFilledComponent } from '../../../../../shared/abstract-components/abstract-self-filled-component.component';

@Component({
  selector: 'app-age-auto',
  templateUrl: './age-auto.component.html',
  styleUrl: './age-auto.component.scss'
})
export class AgeAutoComponent extends AbstractSelfFilledComponent {
  protected override label: string = "AGE";
  protected override name: string = "age";
  protected override unit: string = "ans";
}