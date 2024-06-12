import { Component, Input } from '@angular/core';
import { AbstractMetamorphosisComponent } from '../../abstract-components/abstract-metamorphosis-component.component';

@Component({
  selector: 'app-metamorphosis',
  templateUrl: './metamorphosis.component.html',
  styleUrl: './metamorphosis.component.scss'
})
export class MetamorphosisComponent extends AbstractMetamorphosisComponent {
  @Input() set value(valuePassed: string | number | null) {
    if (typeof valuePassed == "number" && Number.isNaN(valuePassed)) {
      this._value = "";
    }
    else if (typeof valuePassed == "number") this._value = valuePassed.toString();
    else if (valuePassed == "NaN" || valuePassed == null) this._value = "";
    else this._value = valuePassed;
  }

  @Input() set tolog(value: string) {
    console.log(value, "from Metamorphosis")
  }

  get value(): string {
    return this._value
  }
  _value!: string;
}
