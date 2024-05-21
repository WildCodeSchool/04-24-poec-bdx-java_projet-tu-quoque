import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SharedModule } from '../../../../../../../../shared/shared.module';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextComponent } from '../../../../../../../../shared/components/custom-form/form-inputs/input-text/input-text.component';
import { Observable, map } from 'rxjs';
import { TextField } from '../../../../../../../../shared/models/types/fields/text-fields.type';
import { GetFieldsService } from '../../../../../../../../shared/services/form-field/get-fields.service';
import { ParentFormComponent } from '../../../../../../../../shared/components/parent-form/parent-form.component';

@Component({
  selector: 'app-new-character',
  standalone: true,
  templateUrl: './new-character.component.html',
  styleUrl: './new-character.component.scss',
  imports: [InputTextComponent, FormsModule, ReactiveFormsModule, CommonModule, SharedModule, RouterLink]
})
export class NewCharacterComponent extends ParentFormComponent implements OnInit  {

  characterNameField$!: Observable<TextField>;
  characterNameControl!: FormControl;

  constructor(
    _fieldsService: GetFieldsService, 
    _fb: FormBuilder
  ) {
    super();
    this.buildForm();
    this.initializeFormControls();
  }

  ngOnInit() {
    this.characterNameField$ = this._fieldsService.getFields$().pipe(
      map(fields => fields.find(field => field.name === 'characterName') as TextField)
    );
  }

  protected onSubmit() {
    if (this.form.valid) {
      console.log('Form Value:', this.form.value);
    } else {
      console.log('Form is not valid:', 
      this.form.get('characterName')?.errors,
    );
    }
  }

  protected buildForm() {
    this.form = this._fb.group({
      characterName: ['', [
        Validators.required,  
        Validators.minLength(2), 
        Validators.maxLength(50),
        Validators.pattern("[a-zA-Z0-9 ]*")
      ]],
    }, 
  );
  }

  protected initializeFormControls() {
    this.characterNameControl = this.form.get('characterName') as FormControl;
    if (!this.characterNameControl) {
      console.error('characterName control is missing!');
    }
  }
}
