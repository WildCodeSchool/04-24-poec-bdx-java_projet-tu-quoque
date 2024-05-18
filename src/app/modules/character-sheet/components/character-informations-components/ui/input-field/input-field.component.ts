import { Component, Input, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { BasicField } from '../../../../shared/models/types/basic-field.type';
import { InputField } from '../../../../shared/classes/input-field.class';
import { AbstractListenerComponent } from '../../../../shared/abstract-components/abstract-listener-component.component';
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

  // playerInput$: Subject<BasicField> = new Subject();

  // ngOnInit(): void {
  //   this.listener.receiveBasicField(this.playerInput$);
  // }

  // sendChanges() {
  //   const field: BasicField = {
  //     index: this.field.name,
  //     value: this.playerInput
  //   };
  //   this.playerInput$.next(field);
  // }
}
