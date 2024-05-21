import { Component, Input, ViewChild, forwardRef } from '@angular/core';
import { TextField } from '../../../../models/types/fields/text-fields.type';
import { ControlValueAccessor, FormControl, FormsModule, NG_VALUE_ACCESSOR, NgModel, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InputErrorComponent } from '../../errors/input-error/input-error.component';
import { InputTextModule } from 'primeng/inputtext';
import { SharedModule } from '../../../../shared.module';
import { BaseInputComponent } from '../base-input/base-input.component';

@Component({
  selector: 'app-input-text',
  standalone: true,
  templateUrl: './input-text.component.html',
  styleUrl: './input-text.component.scss',
  imports: [InputTextModule, FormsModule, CommonModule, InputErrorComponent, ReactiveFormsModule, SharedModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputTextComponent),
      multi: true
    }
  ]
})
export class InputTextComponent extends BaseInputComponent {

    @Input() override field!: TextField;
    @Input() override control!: FormControl;
}
