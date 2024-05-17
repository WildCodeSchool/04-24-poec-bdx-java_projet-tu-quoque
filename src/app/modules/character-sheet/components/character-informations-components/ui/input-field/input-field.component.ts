import { Component, Input, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Field } from '../../../../shared/models/types/field.type';
import { InputField } from '../../../../shared/classes/input-field.class';
import { AbstractListenerComponent } from '../../../../shared/abstract-components/asbtract-listener-component.component';

@Component({
  selector: 'app-input-field',
  templateUrl: './input-field.component.html',
  styleUrl: './input-field.component.scss'
})
export class InputFieldComponent extends AbstractListenerComponent implements OnInit {
  @Input()
  field!: InputField;

  playerInput: string = "";
  playerInput$: Subject<Field> = new Subject();

  ngOnInit(): void {
    this.listener.receiveInfoFrom(this.playerInput$);
  }

  sendChanges() {
    const field: Field = {
      name: this.field.name,
      value: this.playerInput
    };
    this.playerInput$.next(field);
  }
}
