import { Component, Input, forwardRef, inject } from '@angular/core';
import { ControlValueAccessor, FormControl, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputErrorComponent } from '../../errors/input-error/input-error.component';
import { CommonModule } from '@angular/common';
import { TextAreaField } from '../../../../models/types/fields/textarea-field.type';
import { SharedModule } from '../../../../shared.module';
import { InputTextModule } from 'primeng/inputtext';
import { BaseInputComponent } from '../base-input/base-input.component';

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
export class InputTextareaComponent extends BaseInputComponent {

  @Input() override field!: TextAreaField;
  @Input() override control!: FormControl;
}
