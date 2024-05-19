import { Component, Input } from '@angular/core';
import { BasicField } from '../../../../shared/models/types/basic-field.type';
import { InputField } from '../../../../shared/classes/input-field.class';
import { AbstractSendToListenerComponent } from '../../../../shared/abstract-components/abstract-send-to-listener-component.component';
import { Field } from '../../../../shared/models/types/field.type';

@Component({
  selector: 'app-input-field',
  templateUrl: './input-field.component.html',
  styleUrl: './input-field.component.scss'
})
export class InputFieldComponent extends AbstractSendToListenerComponent {
  @Input()
  field!: InputField;

  playerInput: string = "";

  override updateField(): Field {
    const field: BasicField = {
      index: this.field.name,
      value: this.playerInput
    };
    return field;
  }
}
