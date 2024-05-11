import { Component } from '@angular/core';
import { InputField } from '../../../../../shared/classes/input-field.class';

@Component({
  selector: 'app-god-input',
  templateUrl: './god-input.component.html',
  styleUrl: './god-input.component.scss'
})
export class GodInputComponent {
  field: InputField = new InputField("god", "DIVINITE", "size-196");
}
