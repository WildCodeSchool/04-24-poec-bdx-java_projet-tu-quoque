import { Component, inject } from '@angular/core';
import { TextField } from '../../../../models/fields/text-fields.type';
import { TrackFormSubmitService } from '../../../../services/form-field/track-form-submit.service';
import { FormsModule } from '@angular/forms';
import { CommonModule, KeyValuePipe } from '@angular/common';
import { InputErrorComponent } from '../../errors/input-error/input-error.component';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-input-text',
  standalone: true,
  // templateUrl: './input-text.component.html',
  // styleUrl: './input-text.component.scss',
  imports: [InputTextModule, FormsModule, CommonModule, KeyValuePipe, InputErrorComponent],
  template: `

  <div class="flex flex-column gap-1 field col-12">
    <label [for]="field.id">{{ field.label }}</label>
    <input
        pInputText
        [id]="field.id"
        [name]="field.name"
        [type]="field.type"
        [(ngModel)]="field.value"
        [autocomplete]="field.autocomplete"
        [placeholder]="field.placeholder"
        [required]="field.required"
        [minlength]="field.minlength"
        [maxlength]="field.maxlength"
        [pattern]="field.pattern"
        [disabled]="field.disabled"
        #ref="ngModel"
        [ngClass]="{'ng-invalid ng-dirty': ref.invalid && ref.dirty}"
    />

    @if (ref.errors && ref.dirty && ref.invalid && formSubmitted()) {

      <app-input-error 
        [field]="field"
        [ref]="ref"
      ></app-input-error>
      
    }

</div>`,
  styles: ``
})
export class InputTextComponent {

  formSubmitted = inject(TrackFormSubmitService).state;
  field!: TextField;
}
