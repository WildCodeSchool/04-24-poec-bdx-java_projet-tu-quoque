import { Component, OnDestroy, OnInit } from '@angular/core';
import { SharedModule } from '../../../../shared/shared.module';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextComponent } from '../../../../shared/components/custom-form/form-inputs/input-text/input-text.component';
import { Observable, Subscription, map } from 'rxjs';
import { TextField } from '../../../../shared/models/types/fields/text-fields.type';
import { GetFieldsService } from '../../../../shared/services/form-field/get-fields.service';
import { Router, RouterLink } from '@angular/router';
import { RegexPatterns } from '../../../../shared/models/class/regex-patterns';
import { ParentFormComponent } from '../../../../shared/components/parent-form/parent-form.component';
import { UserRegisterService } from '../../../../shared/services/connection/user-register.service';
import { RegisterResponse } from '../../../../shared/models/types/users/register-response';
import { UserRegister } from '../../../../shared/models/class/user-register.model';


@Component({
  selector: 'app-inscription-page',
  standalone: true,
  templateUrl: './inscription-page.component.html',
  styleUrl: './inscription-page.component.scss',
  imports: [InputTextComponent, FormsModule, ReactiveFormsModule, CommonModule, SharedModule, RouterLink]
})
export class InscriptionPageComponent extends ParentFormComponent implements OnInit, OnDestroy {

  nicknameField$!: Observable<TextField>;
  nicknameControl!: FormControl;
  emailField$!: Observable<TextField>;
  emailControl!: FormControl;
  passwordField$!: Observable<TextField>;
  passwordControl!: FormControl;
  passwordVerificationField$!: Observable<TextField>;
  passwordVerificationControl!: FormControl;

  connexionIcon: string = 'assets/icons/inscription.svg';
  private _subscription!: Subscription;
  private _userRegisterService!: UserRegisterService;
  private _router!: Router;

  constructor(
    _fieldsService: GetFieldsService, 
    _fb: FormBuilder,
    _userRegisterService: UserRegisterService,
    _router: Router
  ) {
    super();
    this._userRegisterService = _userRegisterService;
    this._router = _router;
    this.buildForm(); 
    this.initializeFormControls();
  }

  ngOnInit() {
    this.nicknameField$ = this._fieldsService.getFields$().pipe(
      map(fields => fields.find(field => field.name === 'nickname') as TextField)
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
      const registerData: UserRegister = new UserRegister(
        this.form.value.nickname,
        this.form.value.email,
        this.form.value.password,
        this.form.value.avatar
      ); 
      this._subscription = this._userRegisterService.registerUser(registerData)
        .subscribe({
          next: (response: RegisterResponse) => {
            if (response.message === 'Account successfully created as user') {
              this._router.navigate(['/user']);
            } else {
              console.error('Registration failed:', response.message);
            }
          },
          error: err => {
            console.error('Error during registration:', err);
          }
        });
    } else {
      console.log('Form is not valid:', 
        this.form.get('nickname')?.errors,
        this.form.get('email')?.errors, 
        this.form.get('password')?.errors,
        this.form.get('passwordVerification')?.errors,
      );
    }
  }

  protected buildForm() {
    this.form = this._fb.group({
      nickname: ['', [
        Validators.required,  
        Validators.minLength(2), 
        Validators.maxLength(50),
        Validators.pattern(RegexPatterns.textPattern)
      ]],
      email: ['', [
        Validators.required, 
        Validators.email, 
      ]],
      password: ['', [
        Validators.required, 
        Validators.minLength(8), 
        Validators.maxLength(50),
      ]],
      passwordVerification: ['', [
        Validators.required, 
        Validators.minLength(8), 
        Validators.maxLength(50),
      ]]
    }, 
  );
  }

  protected initializeFormControls() {
    this.nicknameControl = this.form.get('nickname') as FormControl;
    if (!this.nicknameControl) {
      console.error('nickname control is missing!');
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

  ngOnDestroy(): void {
    if (this._subscription) {
      this._subscription.unsubscribe();
    }
  }
}
