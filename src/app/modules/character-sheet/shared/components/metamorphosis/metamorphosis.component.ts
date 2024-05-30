import { Component, Input } from '@angular/core';
import { AbstractMetamorphosisComponent } from '../../abstract-components/abstract-metamorphosis-component.component';

@Component({
  selector: 'app-metamorphosis',
  templateUrl: './metamorphosis.component.html',
  styleUrl: './metamorphosis.component.scss'
})
export class MetamorphosisComponent extends AbstractMetamorphosisComponent {
  @Input()
  value!: string;
}
