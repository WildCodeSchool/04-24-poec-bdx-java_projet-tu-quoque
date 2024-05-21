import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../../../shared/shared.module';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextComponent } from '../../../../shared/components/custom-form/form-inputs/input-text/input-text.component';
import { Observable, map } from 'rxjs';
import { TextField } from '../../../../shared/models/types/fields/text-fields.type';
import { GetFieldsService } from '../../../../shared/services/form-field/get-fields.service';
import { RouterLink } from '@angular/router';
import { RegexPatterns } from '../../../../shared/models/class/regex-patterns';
import { ParentFormComponent } from '../../../../shared/components/parent-form/parent-form.component';

@Component({
  selector: 'app-inscription-page',
  standalone: true,
  templateUrl: './inscription-page.component.html',
  styleUrl: './inscription-page.component.scss',
  imports: [InputTextComponent, FormsModule, ReactiveFormsModule, CommonModule, SharedModule, RouterLink]
})
export class InscriptionPageComponent extends ParentFormComponent implements OnInit {

  usernameField$!: Observable<TextField>;
  usernameControl!: FormControl;
  emailField$!: Observable<TextField>;
  emailControl!: FormControl;
  passwordField$!: Observable<TextField>;
  passwordControl!: FormControl;
  passwordVerificationField$!: Observable<TextField>;
  passwordVerificationControl!: FormControl;
  connexionIcon: string = 'assets/icons/inscription.svg';

  constructor(
    _fieldsService: GetFieldsService, 
    _fb: FormBuilder
  ) {
    super();
    this.buildForm(); 
    this.initializeFormControls();
  }

  ngOnInit() {
    this.usernameField$ = this._fieldsService.getFields$().pipe(
      map(fields => fields.find(field => field.name === 'username') as TextField)
    );

    this.emailField$ = this._fieldsService.getFields$().pipe(
      map(fields => fields.find(field => field.name === 'email') as TextField)
    );

    this.passwordField$ = this._fieldsService.getFields$().pipe(
      map(fields => fields.find(field => field.name === 'password') as TextField)
    );

    this.passwordVerificationField$ = this._fieldsService.getFields$().pipe(
      map(fields => fields.find(field => field.name === 'passwordVerification') as TextField)
    );
  }

  protected onSubmit() {
    if (this.form.valid) {
      console.log('Form Value:', this.form.value);
    } else {
      console.log('Form is not valid:', 
      this.form.get('username')?.errors,
      this.form.get('email')?.errors, 
      this.form.get('password')?.errors,
      this.form.get('passwordVerification')?.errors,
    );
    }
  }

  protected buildForm() {
    this.form = this._fb.group({
      username: ['', [
        Validators.required,  
        Validators.minLength(2), 
        Validators.maxLength(50),
        Validators.pattern(RegexPatterns.textPattern)
      ]],
      email: ['', [
        Validators.required, 
        Validators.email, 
        Validators.minLength(2), 
        Validators.maxLength(50),
        Validators.pattern(RegexPatterns.emailPattern)
      ]],
      password: ['', [
        Validators.required, 
        Validators.minLength(8), 
        Validators.maxLength(50),
        Validators.pattern(RegexPatterns.passwordPattern)
      ]],
      passwordVerification: ['', [
        Validators.required, 
        Validators.minLength(8), 
        Validators.maxLength(50),
        Validators.pattern(RegexPatterns.passwordPattern)
      ]]
    }, 
  );
  }

  protected initializeFormControls() {
    this.usernameControl = this.form.get('username') as FormControl;
    if (!this.usernameControl) {
      console.error('Username control is missing!');
    }

    this.emailControl = this.form.get('email') as FormControl;
    if (!this.emailControl) {
      console.error('Email control is missing!');
    }
  
    this.passwordControl = this.form.get('password') as FormControl;
    if (!this.passwordControl) {
      console.error('Password control is missing!');
    }

    this.passwordVerificationControl = this.form.get('passwordVerification') as FormControl;
    if (!this.passwordControl) {
      console.error('passwordVerification control is missing!');
    }
  }
}
