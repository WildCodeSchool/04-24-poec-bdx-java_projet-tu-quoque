import { Component, Input } from '@angular/core';
import { AbstractMetamorphosisComponent } from '../../abstract-components/abstract-metamorphosis-component.component';

@Component({
  selector: 'app-metamorphosis',
  templateUrl: './metamorphosis.component.html',
  styleUrl: './metamorphosis.component.scss'
})
export class MetamorphosisComponent extends AbstractMetamorphosisComponent {
  @Input() set value(valuePassed: string | number) {
    if (typeof valuePassed == "number" && Number.isNaN(valuePassed)) {
      this._value = "";
      console.log(NaN);
    }
    else if (typeof valuePassed == "number") this._value = valuePassed.toString();
    else if (valuePassed == "NaN") this._value = "";
    else this._value = valuePassed;
  }

  get value() {
    return this._value
  }
  _value!: string;
}
