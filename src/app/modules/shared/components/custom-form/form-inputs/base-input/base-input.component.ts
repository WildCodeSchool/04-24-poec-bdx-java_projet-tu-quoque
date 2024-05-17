import { Component } from '@angular/core';
import { ControlValueAccessor, FormControl } from '@angular/forms';
import { TextAreaField } from '../../../../models/types/fields/textarea-field.type';
import { TextField } from '../../../../models/types/fields/text-fields.type';

@Component({
  selector: 'app-base-input',
  templateUrl: './base-input.component.html'
})
export abstract class BaseInputComponent implements ControlValueAccessor {

  protected field!: TextAreaField | TextField;
  protected control!: FormControl;

  protected _onChanged = (value: string) => {};
  protected _onTouched = () => {};

  onInputChange(value: string): void {
    this.field.value = value;
    this._onChanged(value);
  }

  writeValue(value: any): void {
    if (value !== undefined && this.control.value !== value) {
      this.control.setValue(value, { emitEvent: false });
    }
  }

  registerOnChange(fn: any): void {
    this._onChanged = fn;
  }

  registerOnTouched(fn: () => void): void {
    this._onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    if (isDisabled) {
      this.control.disable();
    } else {
      this.control.enable();
    }
  }

  updateChanges(value: any): void {
    this._onChanged(value);
  }

  onBlur(): void {
    this._onTouched();
  }
}
