import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SharedModule } from '../../../../../../../../shared/shared.module';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextComponent } from '../../../../../../../../shared/components/custom-form/form-inputs/input-text/input-text.component';
import { Observable, Subscription, map } from 'rxjs';
import { TextField } from '../../../../../../../../shared/models/types/fields/text-fields.type';
import { GetFieldsService } from '../../../../../../../../shared/services/form-field/get-fields.service';
import { ParentFormComponent } from '../../../../../../../../shared/components/parent-form/parent-form.component';
import { RegexPatterns } from '../../../../../../../../shared/models/class/regex-patterns';
import { UploadFileService } from '../../../../../../../../shared/services/uploadFile/upload-file.service';
import { UploadToFirebaseService } from '../../../../../../../../shared/services/uploadFile/upload-to-firebase.service';

@Component({
  selector: 'app-new-character',
  standalone: true,
  templateUrl: './new-character.component.html',
  styleUrl: './new-character.component.scss',
  imports: [InputTextComponent, FormsModule, ReactiveFormsModule, CommonModule, SharedModule, RouterLink]
})
export class NewCharacterComponent extends ParentFormComponent implements OnInit, OnDestroy {

  characterNameField$!: Observable<TextField>;
  characterNameControl!: FormControl;
  uploadedFileTypes: string[] = [];
  selectedFile: File | null = null;
  private _subscription!: Subscription;

  constructor(
    _fieldsService: GetFieldsService, 
    _fb: FormBuilder,
    private _uploadFileService: UploadFileService,
    private _uploadToFirebaseService: UploadToFirebaseService
  ) {
    super();
    this.buildForm();
    this.initializeFormControls();
  }

  ngOnInit() {
    this.characterNameField$ = this._fieldsService.getFields$().pipe(
      map(fields => fields.find(field => field.name === 'characterName') as TextField)
    );

    this._subscription = this._uploadFileService.selectedFile$.subscribe(
      file => {
        this.selectedFile = file;
      }
    );
  }

  ngOnDestroy() {
    if (this._subscription) {
      this._subscription.unsubscribe();
    }
  }

  protected onSubmit() {
    if (this.form.valid) {
      const selectedFile = this._uploadFileService.getSelectedFile();
      console.log('Form Value:', this.form.value);
      console.log('Uploaded File Types:', this.uploadedFileTypes);
      console.log('Selected File:', selectedFile);
      
    } else {
      console.log('Form is not valid:', 
      this.form.get('characterName')?.errors,
    );
    }
  }

  protected buildForm() {
    this.form = this._fb.group({
      characterName: ['', [
        Validators.required,  
        Validators.minLength(2), 
        Validators.maxLength(50),
        Validators.pattern(RegexPatterns.textPattern)
      ]],
    }, 
    
  );
  }

  protected initializeFormControls() {
    this.characterNameControl = this.form.get('characterName') as FormControl;
    if (!this.characterNameControl) {
      console.error('characterName control is missing!');
    }
  }
}
