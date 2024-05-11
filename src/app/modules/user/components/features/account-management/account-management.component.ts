import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SharedModule } from '../../../../shared/shared.module';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextComponent } from '../../../../shared/components/custom-form/form-inputs/input-text/input-text.component';
import { Observable, map } from 'rxjs';
import { TextField } from '../../../../shared/models/types/fields/text-fields.type';
import { GetFieldsService } from '../../../../shared/services/form-field/get-fields.service';

@Component({
  selector: 'app-account-management',
  standalone: true,
  templateUrl: './account-management.component.html',
  styleUrl: './account-management.component.scss',
  imports: [InputTextComponent, FormsModule, ReactiveFormsModule, CommonModule, SharedModule, RouterLink]
})
export class AccountManagementComponent implements OnInit {

  form!: FormGroup;
  usernameChangeField$!: Observable<TextField>;
  usernameChangeControl!: FormControl;
  connexionIcon: string = 'assets/icons/connexion.svg';
  userAvatar: string = '/assets/images/user-profile-images/user1.jpg';

  constructor(private _fieldsService: GetFieldsService, private _fb: FormBuilder) {
    this.form = this._fb.group({
      usernameChange: ['', [
        Validators.required, 
        Validators.minLength(2), 
        Validators.maxLength(50),
        Validators.pattern("[a-zA-Z0-9]*")
      ]]
    }, 
  );
  }

  ngOnInit() {
    this.usernameChangeField$ = this._fieldsService.getFields$().pipe(
      map(fields => fields.find(field => field.name === 'usernameChange') as TextField)
    );

    this.usernameChangeControl = this.form.get('usernameChange') as FormControl;
    if (!this.usernameChangeControl) {
      console.error('usernameChange control is missing!');
    }
  }

  onSubmit() {
    if (this.form.valid) {
      console.log('Form Value:', this.form.value);
    } else {
      console.log('Form is not valid:', this.form.get('usernameChange')?.errors);
    }
  }
}