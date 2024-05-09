import { Component } from '@angular/core';
import { InputField } from '../../../../shared/classes/input-field.class';

@Component({
  selector: 'app-third-line-inputs',
  templateUrl: './third-line-inputs.component.html',
  styleUrl: './third-line-inputs.component.scss'
})
export class ThirdLineInputsComponent {
  fieldList: InputField[] = [
    new InputField("eyesColor", "YEUX", "size-m"),
    new InputField("hairColor", "CHEVEUX", "size-m"),
    new InputField("skinColor", "PEAU", "size-m"),
  ]
}
