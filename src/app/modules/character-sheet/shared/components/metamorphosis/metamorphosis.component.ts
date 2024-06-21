import { Component, Input } from '@angular/core';
import { AbstractMetamorphosisComponent } from '../../abstract-components/abstract-metamorphosis-component.component';

@Component({
  selector: 'app-metamorphosis',
  templateUrl: './metamorphosis.component.html',
  styleUrl: './metamorphosis.component.scss'
})
export class MetamorphosisComponent extends AbstractMetamorphosisComponent {
  @Input() set value(valuePassed: string | number | null) {
    if (typeof valuePassed == "string") this._value = valuePassed;
    else if (typeof valuePassed == "number" && (!Number.isNaN(valuePassed))) this._value = valuePassed.toString();
    else this._value = "";
  }

  get value(): string {
    return this._value
  }
  _value!: string;
}
