import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GetFieldsService } from '../../services/form-field/get-fields.service';

@Component({
  selector: 'app-parent-form',
  templateUrl: './parent-form.component.html',
  styleUrl: './parent-form.component.scss'
})
export abstract class ParentFormComponent {
  
  form!: FormGroup;

  protected _fb: FormBuilder = inject(FormBuilder);
  protected _fieldsService: GetFieldsService = inject(GetFieldsService);

  protected abstract onSubmit(): void;
  protected abstract buildForm(): void;
  protected abstract initializeFormControls(): void;
}

