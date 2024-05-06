import { CommonModule, KeyValuePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputErrorComponent } from '../../errors/input-error/input-error.component';
import { FileField } from '../../../../models/fields/file-fields.type';
import { TrackFormSubmitService } from '../../../../services/form-field/track-form-submit.service';


@Component({
  selector: 'app-input-file',
  standalone: true,
  // templateUrl: './input-file.component.html',
  // styleUrl: './input-file.component.scss',
  imports: [InputTextModule, FormsModule, CommonModule, KeyValuePipe, InputErrorComponent],
  template: `

  <div class="flex flex-column gap-1 field col-12">
    <label [for]="field.id">{{ field.label }}</label>
    <input
        pInputFile
        [id]="field.id"
        [name]="field.name"
        [type]="field.type"
        [(ngModel)]="field.value"
        [autocomplete]="field.autocomplete"
        [placeholder]="field.placeholder"
        [required]="field.required"
        [disabled]="field.disabled"
        [accept]="field.accept"
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
export class InputFileComponent {

  formSubmitted = inject(TrackFormSubmitService).state;
  field!: FileField;
}
