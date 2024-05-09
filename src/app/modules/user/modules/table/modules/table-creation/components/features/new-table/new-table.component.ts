import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SharedModule } from '../../../../../../../../shared/shared.module';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextComponent } from '../../../../../../../../shared/components/custom-form/form-inputs/input-text/input-text.component';
import { Observable, map } from 'rxjs';
import { TextField } from '../../../../../../../../shared/models/types/fields/text-fields.type';
import { GetFieldsService } from '../../../../../../../../shared/services/form-field/get-fields.service';

@Component({
  selector: 'app-new-table',
  standalone: true,
  templateUrl: './new-table.component.html',
  styleUrl: './new-table.component.scss',
  imports: [InputTextComponent, FormsModule, ReactiveFormsModule, CommonModule, SharedModule, RouterLink]
})
export class NewTableComponent implements OnInit{

  form!: FormGroup;
  tableNameField$!: Observable<TextField>;
  tableNameControl!: FormControl;

  constructor(private _fieldsService: GetFieldsService, private _fb: FormBuilder) {
    this.form = this._fb.group({
      tableName: ['', [
        Validators.required,  
        Validators.minLength(2), 
        Validators.maxLength(50),
        Validators.pattern("[a-zA-Z0-9 ]*")
      ]],
    }, 
  );
  }

  ngOnInit() {
    this.tableNameField$ = this._fieldsService.getFields$().pipe(
      map(fields => fields.find(field => field.name === 'tableName') as TextField)
    );

    this.tableNameControl = this.form.get('tableName') as FormControl;
    if (!this.tableNameControl) {
      console.error('tableName control is missing!');
    }
  }

  onSubmit() {
    if (this.form.valid) {
      console.log('Form Value:', this.form.value);
    } else {
      console.log('Form is not valid:', 
      this.form.get('tableName')?.errors,
    );
    }
  }
}
