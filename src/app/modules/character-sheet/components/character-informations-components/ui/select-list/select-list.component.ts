import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { BasicField } from '../../../../shared/models/types/basic-field.type';
import { AbstractSendToListenerComponent } from '../../../../shared/abstract-components/abstract-send-to-listener-component.component';
import { Field } from '../../../../shared/models/types/field.type';

@Component({
  selector: 'app-select-list',
  templateUrl: './select-list.component.html',
  styleUrl: './select-list.component.scss'
})
export class SelectListComponent extends AbstractSendToListenerComponent {
  @Input()
  list$!: Observable<any>;
  @Input()
  selectName!: string;
  @Input()
  selectLabel!: string;
  @Input()
  actual!: string;

  override updateField(value: string): Field {
    const field: BasicField = {
      index: this.selectName,
      value: value
    }
    return field;
  }
}
