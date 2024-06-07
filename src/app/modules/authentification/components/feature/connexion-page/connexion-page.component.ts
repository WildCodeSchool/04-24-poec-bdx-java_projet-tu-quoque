import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextComponent } from '../../../../shared/components/custom-form/form-inputs/input-text/input-text.component';
import { Observable, Subscription, map } from 'rxjs';
import { GetFieldsService } from '../../../../shared/services/form-field/get-fields.service';
import { TextField } from '../../../../shared/models/types/fields/text-fields.type';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../../shared/shared.module';
import { Router, RouterLink } from '@angular/router';
import { userService } from '../../../../shared/services/users/user.service';
import { RegexPatterns } from '../../../../shared/models/class/regex-patterns';
import { ParentFormComponent } from '../../../../shared/components/parent-form/parent-form.component';
import { UserAuthenticateService } from '../../../../shared/services/connection/user-authenticate.service';
import { UserAuth } from '../../../../shared/models/class/user-auth.model';

@Component({
  selector: 'app-connexion-page',
  standalone: true,
  templateUrl: './connexion-page.component.html',
  styleUrl: './connexion-page.component.scss',
  imports: [InputTextComponent, FormsModule, ReactiveFormsModule, CommonModule, SharedModule, RouterLink]
})
export class ConnexionPageComponent extends ParentFormComponent implements OnDestroy {

  emailField$!: Observable<TextField>;
  emailControl!: FormControl;
  passwordField$!: Observable<TextField>;
  passwordControl!: FormControl;

  connexionIcon: string = 'assets/icons/connexion.svg';

  private _userCheckSubscription! : Subscription;
  private _userAuthenticateService: UserAuthenticateService;
  private router: Router;

  constructor(
    _fieldsService: GetFieldsService, 
    _fb: FormBuilder, 
    _userAuthenticateService: UserAuthenticateService, 
    router: Router
  ) {
    super();
    this._userAuthenticateService = _userAuthenticateService;
    this.router = router;
    this.buildForm();
    this.initializeFormControls();
    
  }

  ngOnInit() {
    this.emailField$ = this._fieldsService.getFields$().pipe(
      map(fields => fields.find(field => field.name === 'email') as TextField)
    );

    this.passwordField$ = this._fieldsService.getFields$().pipe(
      map(fields => fields.find(field => field.name === 'password') as TextField)
    );
  }

  protected onSubmit() {
    if (this.form.valid) {
      const email = this.form.value.email;
      const password = this.form.value.password;
      const userAuth = new UserAuth(email, password);

      this._userCheckSubscription = this._userAuthenticateService.authenticateUser(userAuth)
      .subscribe({
        next: (tokenFromDB) => {
          this.router.navigate(['/user']);
        },
        error: (err) => {
          console.log('Authentication failed', err);
        }
      });
    } else {
      console.log('Le formulaire est invalide');
    }
  }

  ngOnDestroy(): void {
      if (this._userCheckSubscription) {
        this._userCheckSubscription.unsubscribe();
      }
  }

  protected buildForm() {
    this.form = this._fb.group({
      email: ['', [
        Validators.required, 
        Validators.email, 
        Validators.minLength(2), 
        Validators.maxLength(50),
        Validators.pattern(RegexPatterns.emailPattern)
      ]],
      password: ['', [
        Validators.required
      ]]
    });
  }
  
  protected initializeFormControls() {
    this.emailControl = this.form.get('email') as FormControl;
    if (!this.emailControl) {
      console.error('Email control is missing!');
    }
  
    this.passwordControl = this.form.get('password') as FormControl;
    if (!this.passwordControl) {
      console.error('Password control is missing!');
    }
  }
}
