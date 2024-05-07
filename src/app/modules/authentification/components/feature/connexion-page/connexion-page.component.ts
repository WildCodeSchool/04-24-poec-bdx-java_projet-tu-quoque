import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextComponent } from '../../../../shared/components/custom-form/form-inputs/input-text/input-text.component';
import { Observable, map } from 'rxjs';
import { GetFieldsService } from '../../../../shared/services/form-field/get-fields.service';
import { TextField } from '../../../../shared/models/fields/text-fields.type';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../../shared/shared.module';


@Component({
  selector: 'app-connexion-page',
  standalone: true,
  templateUrl: './connexion-page.component.html',
  styleUrl: './connexion-page.component.scss',
  imports: [InputTextComponent, FormsModule, ReactiveFormsModule, CommonModule, SharedModule]
})
export class ConnexionPageComponent implements OnInit {

  form!: FormGroup;
  emailField$!: Observable<TextField>;
  emailControl!: FormControl;
  passwordField$!: Observable<TextField>;
  passwordControl!: FormControl;
  connexionIcon: string = 'assets/icons/connexion.svg';

  constructor(private _fieldsService: GetFieldsService, private _fb: FormBuilder) {
    this.form = this._fb.group({
      email: ['', [
        Validators.required, 
        Validators.email, 
        Validators.minLength(2), 
        Validators.maxLength(50),
        Validators.pattern("[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}")
      ]],
      password: ['', [
        Validators.required, 
        Validators.minLength(8), 
        Validators.maxLength(50),
        Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$")
      ]]
    }, 
  );
  }

  ngOnInit() {
    this.emailField$ = this._fieldsService.getFields$().pipe(
      map(fields => fields.find(field => field.name === 'email') as TextField)
    );

    this.passwordField$ = this._fieldsService.getFields$().pipe(
      map(fields => fields.find(field => field.name === 'password') as TextField)
    );

    this.emailControl = this.form.get('email') as FormControl;
    if (!this.emailControl) {
      console.error('Email control is missing!');
    }
  
    this.passwordControl = this.form.get('password') as FormControl;
    if (!this.passwordControl) {
      console.error('Password control is missing!');
    }
  }


  onSubmit() {
    if (this.form.valid) {
      console.log('Form Value:', this.form.value);
    } else {
      console.log('Form is not valid:', this.form.get('email')?.errors, this.form.get('password')?.errors);
    }
  }
  
}
