import { Component } from '@angular/core';
import { AbstractSelfFilledComponent } from '../abstract-self-filled-component.component';

@Component({
  selector: 'app-weight-auto',
  templateUrl: './weight-auto.component.html',
  styleUrl: './weight-auto.component.scss'
})
export class WeightAutoComponent extends AbstractSelfFilledComponent {
  protected override label: string = "POIDS";
  protected override name: string = "weight";
  protected override unit: string = "kgs";
}
