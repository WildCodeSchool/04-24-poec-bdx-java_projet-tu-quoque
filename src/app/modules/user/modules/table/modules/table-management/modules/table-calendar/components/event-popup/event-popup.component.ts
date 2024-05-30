import { Component, OnInit } from '@angular/core';
import { InputTextComponent } from '../../../../../../../../../shared/components/custom-form/form-inputs/input-text/input-text.component';
import { InputTextareaComponent } from '../../../../../../../../../shared/components/custom-form/form-inputs/input-textarea/input-textarea.component';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../../../../../../../shared/shared.module';
import { ParentFormComponent } from '../../../../../../../../../shared/components/parent-form/parent-form.component';
import { Observable, map } from 'rxjs';
import { TextField } from '../../../../../../../../../shared/models/types/fields/text-fields.type';
import { TextAreaField } from '../../../../../../../../../shared/models/types/fields/textarea-field.type';
import { GetFieldsService } from '../../../../../../../../../shared/services/form-field/get-fields.service';
import { RegexPatterns } from '../../../../../../../../../shared/models/class/regex-patterns';

@Component({
  selector: 'app-event-popup',
  standalone: true,
  templateUrl: './event-popup.component.html',
  styleUrl: './event-popup.component.scss',
  imports: [InputTextComponent, InputTextareaComponent, FormsModule, ReactiveFormsModule, CommonModule, SharedModule]
})
export class EventPopupComponent extends ParentFormComponent implements OnInit{
  calendarTitleField$!: Observable<TextField>;
  calendarTitleControl!: FormControl;
  calendarDateField$!: Observable<TextField>;
  calendarDateControl!: FormControl;
  calendarDescriptionField$!: Observable<TextAreaField>;
  calendarDescriptionControl!: FormControl;

  constructor(
    _fieldsService: GetFieldsService, 
    _fb: FormBuilder
  ) {
    super();
    this.buildForm();
    this.initializeFormControls();
  }

  ngOnInit() {
    this.calendarTitleField$ = this._fieldsService.getFields$().pipe(
      map(fields => fields.find(field => field.name === 'calendarTitle') as TextField)
    );
    this.calendarDateField$ = this._fieldsService.getFields$().pipe(
      map(fields => fields.find(field => field.name === 'calendarDate') as TextField)
    );

    this.calendarDescriptionField$ = this._fieldsService.getFields$().pipe(
      map(fields => fields.find(field => field.name === 'calendarDescription') as TextAreaField)
    );    
  }

  protected onSubmit() {
    if (this.form.valid) {
      console.log('Form Value:', this.form.value);
    } else {
      console.log('Form is not valid:', this.form.get('calendarTitle')?.errors, this.form.get('calendarDate')?.errors, this.form.get('calendarDescription'));
    }
  }

  protected buildForm(){
    this.form = this._fb.group({
      calendarTitle: ['', [
        Validators.required, 
        Validators.minLength(2), 
        Validators.maxLength(50),
        Validators.pattern(RegexPatterns.textPattern)
      ]],
      calendarDate: ['', [
        Validators.required, 
        Validators.minLength(2), 
        Validators.maxLength(50),
        Validators.pattern(RegexPatterns.textPattern)
      ]],
      calendarDescription: ['', [
        Validators.required 
      ]]
    }, 
  );
  }

  protected initializeFormControls() {
    this.calendarTitleControl = this.form.get('noteTitle') as FormControl;
    if (!this.calendarTitleControl) {
      console.error('calendarTitle control is missing!');
    }
    this.calendarDateControl = this.form.get('noteTitle') as FormControl;
    if (!this.calendarDateControl) {
      console.error('calendarDate control is missing!');
    }
    this.calendarDescriptionControl = this.form.get('noteDescription') as FormControl;
    if (!this.calendarDescriptionControl) {
      console.error('calendarDescription control is missing!');
    }
  }
}
