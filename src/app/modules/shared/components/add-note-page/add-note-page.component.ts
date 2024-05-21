import { Component, OnInit } from '@angular/core';
import { InputTextComponent } from '../custom-form/form-inputs/input-text/input-text.component';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SharedModule } from '../../shared.module';
import { Observable, map } from 'rxjs';
import { TextField } from '../../models/types/fields/text-fields.type';
import { GetFieldsService } from '../../services/form-field/get-fields.service';
import { InputTextareaComponent } from '../custom-form/form-inputs/input-textarea/input-textarea.component';
import { TextAreaField } from '../../models/types/fields/textarea-field.type';
import { ParentFormComponent } from '../parent-form/parent-form.component';

@Component({
  selector: 'app-add-note-page',
  standalone: true,
  templateUrl: './add-note-page.component.html',
  styleUrl: './add-note-page.component.scss',
  imports: [InputTextComponent, InputTextareaComponent, FormsModule, ReactiveFormsModule, CommonModule, SharedModule, RouterLink]
})
export class AddNotePageComponent extends ParentFormComponent implements OnInit {

  noteTitleField$!: Observable<TextField>;
  noteTitleControl!: FormControl;
  noteDescriptionField$!: Observable<TextAreaField>;
  noteDescriptionControl!: FormControl;

  constructor(
    _fieldsService: GetFieldsService, 
    _fb: FormBuilder
  ) {
    super();
    this.buildForm();
    this.initializeFormControls();
  }

  ngOnInit() {
    this.noteTitleField$ = this._fieldsService.getFields$().pipe(
      map(fields => fields.find(field => field.name === 'noteTitle') as TextField)
    );

    this.noteDescriptionField$ = this._fieldsService.getFields$().pipe(
      map(fields => fields.find(field => field.name === 'noteDescription') as TextAreaField)
    );    
  }

  protected onSubmit() {
    if (this.form.valid) {
      console.log('Form Value:', this.form.value);
    } else {
      console.log('Form is not valid:', this.form.get('noteTitle')?.errors, this.form.get('noteDescription'));
    }
  }

  protected buildForm(){
    this.form = this._fb.group({
      noteTitle: ['', [
        Validators.required, 
        Validators.minLength(2), 
        Validators.maxLength(50),
        Validators.pattern("[a-zA-Z0-9]*")
      ]],
      noteDescription: ['', [
        Validators.required 
      ]]
    }, 
  );
  }

  protected initializeFormControls() {
    this.noteTitleControl = this.form.get('noteTitle') as FormControl;
    if (!this.noteTitleControl) {
      console.error('noteTitle control is missing!');
    }
    this.noteDescriptionControl = this.form.get('noteDescription') as FormControl;
    if (!this.noteDescriptionControl) {
      console.error('noteDescription control is missing!');
    }
  }
}
