import { Component, Input, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Field } from '../../../../shared/models/types/field.type';
import { ListenPlayerActionService } from '../../../../shared/services/listen-player-action.service';
import { InputField } from '../../../../shared/classes/input-field.class';

@Component({
  selector: 'app-input-field',
  templateUrl: './input-field.component.html',
  styleUrl: './input-field.component.scss'
})
export class InputFieldComponent implements OnInit {
  @Input()
  field!: InputField;

  playerInput: string = "";
  playerInput$: Subject<Field> = new Subject();

  constructor(private listener: ListenPlayerActionService) {

  }

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
