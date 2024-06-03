import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SharedModule } from '../../../../shared/shared.module';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextComponent } from '../../../../shared/components/custom-form/form-inputs/input-text/input-text.component';
import { Observable, map } from 'rxjs';
import { TextField } from '../../../../shared/models/types/fields/text-fields.type';
import { GetFieldsService } from '../../../../shared/services/form-field/get-fields.service';
import { ParentFormComponent } from '../../../../shared/components/parent-form/parent-form.component';
import { RegexPatterns } from '../../../../shared/models/class/regex-patterns';

@Component({
  selector: 'app-account-management',
  standalone: true,
  templateUrl: './account-management.component.html',
  styleUrl: './account-management.component.scss',
  imports: [InputTextComponent, FormsModule, ReactiveFormsModule, CommonModule, SharedModule, RouterLink]
})
export class AccountManagementComponent extends ParentFormComponent implements OnInit {

  nicknameChangeField$!: Observable<TextField>;
  nicknameChangeControl!: FormControl;
  connexionIcon: string = 'assets/icons/connexion.svg';
  userAvatar: string = '/assets/images/user-profile-images/user1.jpg';

  constructor(
  _fieldsService: GetFieldsService, 
  _fb: FormBuilder
  ) {
    super();
    this.buildForm();
    this.initializeFormControls();
  }

  ngOnInit() {
    this.nicknameChangeField$ = this._fieldsService.getFields$()
    .pipe(
      map(fields => fields.find(field => field.name === 'nicknameChange') as TextField)
    );
  }

  protected onSubmit() {
    if (this.form.valid) {
      console.log('Form Value:', this.form.value);
    } else {
      console.log('Form is not valid:', this.form.get('nicknameChange')?.errors);
    }
  }

  protected buildForm() {
    this.form = this._fb.group({
      nicknameChange: ['', [
        Validators.required, 
        Validators.minLength(2), 
        Validators.maxLength(50),
        Validators.pattern(RegexPatterns.textPattern)
      ]]
    }, 
  );
  }

  protected initializeFormControls() {
    this.nicknameChangeControl = this.form.get('nicknameChange') as FormControl;
    if (!this.nicknameChangeControl) {
      console.error('nicknameChange control is missing!');
    }
  }
}
