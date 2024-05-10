import { Component, OnInit } from '@angular/core';
import { InputTextComponent } from '../custom-form/form-inputs/input-text/input-text.component';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SharedModule } from '../../shared.module';
import { Observable, map } from 'rxjs';
import { TextField } from '../../models/types/fields/text-fields.type';
import { GetFieldsService } from '../../services/form-field/get-fields.service';

@Component({
  selector: 'app-add-note-page',
  standalone: true,
  templateUrl: './add-note-page.component.html',
  styleUrl: './add-note-page.component.scss',
  imports: [InputTextComponent, FormsModule, ReactiveFormsModule, CommonModule, SharedModule, RouterLink]
})
export class AddNotePageComponent implements OnInit {

  form!: FormGroup;
  noteTitleField$!: Observable<TextField>;
  noteTitleControl!: FormControl;
  connexionIcon: string = 'assets/icons/connexion.svg';

  constructor(private _fieldsService: GetFieldsService, private _fb: FormBuilder) {
    this.form = this._fb.group({
      noteTitle: ['', [
        Validators.required, 
        Validators.minLength(2), 
        Validators.maxLength(50),
        Validators.pattern("[a-zA-Z0-9]*")
      ]]
    }, 
  );
  }

  ngOnInit() {
    this.noteTitleField$ = this._fieldsService.getFields$().pipe(
      map(fields => fields.find(field => field.name === 'noteTitle') as TextField)
    );

    this.noteTitleControl = this.form.get('noteTitle') as FormControl;
    if (!this.noteTitleControl) {
      console.error('noteTitle control is missing!');
    }
  }


  onSubmit() {
    if (this.form.valid) {
      console.log('Form Value:', this.form.value);
    } else {
      console.log('Form is not valid:', this.form.get('noteTitle')?.errors);
    }
  }
}
