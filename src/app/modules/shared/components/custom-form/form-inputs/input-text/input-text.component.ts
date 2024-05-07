import { Component, Input, ViewChild, forwardRef, inject } from '@angular/core';
import { TextField } from '../../../../models/fields/text-fields.type';
import { TrackFormSubmitService } from '../../../../services/form-field/track-form-submit.service';
import { ControlValueAccessor, FormControl, FormsModule, NG_VALUE_ACCESSOR, NgModel, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, KeyValuePipe } from '@angular/common';
import { InputErrorComponent } from '../../errors/input-error/input-error.component';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-input-text',
  standalone: true,
  // templateUrl: './input-text.component.html',
  styleUrl: './input-text.component.scss',
  imports: [InputTextModule, FormsModule, CommonModule, KeyValuePipe, InputErrorComponent, ReactiveFormsModule],
  template: `
    <label [for]="field.id">{{ field.label }}</label>
    <input
        pInputText
        [id]="field.id"
        [name]="field.name"
        [type]="field.type"
        [formControl]="control"
        [placeholder]="field.placeholder"
        (blur)="onBlur()"
    />

  <app-input-error 
  [control]="control">
  </app-input-error>
`,
  styles: ``,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputTextComponent),
      multi: true
    }
  ]
})
export class InputTextComponent implements ControlValueAccessor {

    @Input() field!: TextField;
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
