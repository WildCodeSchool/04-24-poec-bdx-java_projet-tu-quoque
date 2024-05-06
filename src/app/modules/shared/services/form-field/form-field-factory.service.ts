import { Injectable, Type, ViewContainerRef } from '@angular/core';
import { TextField } from '../../models/fields/text-fields.type';

import { InputTextComponent } from '../../components/custom-form/form-inputs/input-text/input-text.component';
import { InputTextareaComponent } from '../../components/custom-form/form-inputs/input-textarea/input-textarea.component';
import { InputFileComponent } from '../../components/custom-form/form-inputs/input-file/input-file.component';
import { ComponentTypes } from '../../models/enums/component-types.enum';

@Injectable({
  providedIn: 'root'
})
export class FormFieldFactoryService {

    
  createFieldComponent(componentType: string, containerRef: ViewContainerRef, fieldData: TextField): void {

    let componentToCreate: Type<any>;

    switch (componentType) {
      case ComponentTypes.TEXT:
        componentToCreate = InputTextComponent;
        break;
      case ComponentTypes.TEXTAREA:
        componentToCreate = InputTextareaComponent;
        break;
        case ComponentTypes.FILE:
        componentToCreate = InputFileComponent;
        break;
      default:
        componentToCreate = InputTextComponent;
      
    }

    const component = containerRef.createComponent(componentToCreate);
    component.instance.field = fieldData;
  }
}
