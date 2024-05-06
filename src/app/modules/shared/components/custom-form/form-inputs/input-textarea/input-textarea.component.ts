import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputErrorComponent } from '../../errors/input-error/input-error.component';
import { CommonModule } from '@angular/common';
import { TrackFormSubmitService } from '../../../../services/form-field/track-form-submit.service';
import { TextAreaField } from '../../../../models/fields/textarea-field.type';

@Component({
  selector: 'app-input-textarea',
  standalone: true,
  // templateUrl: './input-textarea.component.html',
  // styleUrl: './input-textarea.component.scss',
  imports: [InputTextareaModule, FormsModule, CommonModule, InputErrorComponent],
  template: `

  <div class="flex flex-column gap-1 field col-12">
      <label [for]="field.id">{{ field.label }}</label>
      <textarea
          pInputTextarea
          [rows]="5"
          [cols]="30"
          [id]="field.id"
          [name]="field.name"
          [(ngModel)]="field.value"
          [placeholder]="field.placeholder"
          [required]="field.required"
          [minlength]="field.minlength"
          [disabled]="field.disabled"
          #ref="ngModel"
          [ngClass]="{'ng-invalid ng-dirty': ref.invalid && ref.dirty}"
      ></textarea>

      @if (ref.errors && ref.dirty && ref.invalid && formSubmitted()) {

        <app-input-error 
        [field]="field"
        [ref]="ref"
      ></app-input-error>

      }

  </div>
  `,
  styles: ``
})
export class InputTextareaComponent {

  formSubmitted = inject(TrackFormSubmitService).state;
  field!: TextAreaField;
}
