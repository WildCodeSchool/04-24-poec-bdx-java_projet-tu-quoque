import { Component, Input, forwardRef, inject } from '@angular/core';
import { FormControl, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputErrorComponent } from '../../errors/input-error/input-error.component';
import { CommonModule } from '@angular/common';
import { TextAreaField } from '../../../../models/types/fields/textarea-field.type';
import { SharedModule } from '../../../../shared.module';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-input-textarea',
  standalone: true,
  templateUrl: './input-textarea.component.html',
  styleUrl: './input-textarea.component.scss',
  imports: [InputTextModule, FormsModule, CommonModule, InputErrorComponent, ReactiveFormsModule, SharedModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputTextareaComponent),
      multi: true
    }
  ]
})
export class InputTextareaComponent {

  @Input() field!: TextAreaField;
  @Input() control!: FormControl;

  private _onChanged = (value: string) => {};
    private _onTouched = () => {};

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
