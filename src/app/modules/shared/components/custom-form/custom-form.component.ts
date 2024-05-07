import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, ViewChild, ViewContainerRef, effect, forwardRef, inject } from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormControl, FormGroup, FormsModule, NG_VALUE_ACCESSOR, ValidatorFn, Validators } from '@angular/forms';
import { Fields } from '../../models/fields/fields.type';
import { GetFieldsService } from '../../services/form-field/get-fields.service';
import { Observable, Subscription, tap } from 'rxjs';
import { TrackFormSubmitService } from '../../services/form-field/track-form-submit.service';
import { ButtonModule } from 'primeng/button';
import { FormFieldFactoryService } from '../../services/form-field/form-field-factory.service';


@Component({
  selector: 'app-custom-form',
  standalone: true,
  imports: [FormsModule, ButtonModule],
  templateUrl: './custom-form.component.html',
  styleUrl: './custom-form.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomFormComponent),
      multi: true,
    }
  ]
})
export class CustomFormComponent {
  @ViewChild('fieldsContainer', { read: ViewContainerRef }) fieldsContainer!: ViewContainerRef;
  private _fieldsSubscription!: Subscription;

  constructor(
    private _factoryService: FormFieldFactoryService,
    private _cdr: ChangeDetectorRef,
    private _getFieldsService: GetFieldsService,
    private _submitService: TrackFormSubmitService
  ) {}

  ngOnInit() {
    this._fieldsSubscription = this._getFieldsService.getFields$().subscribe(fields => {
      console.log("Fields received in ngOnInit:", fields);
      this.generateFields(fields);
      this._cdr.detectChanges();
    });
  }

  generateFields(fieldsData: any[]) {
    console.log("Fields to generate:", fieldsData);
    fieldsData.forEach(fieldData => {
      this._factoryService.createFieldComponent(fieldData.fieldType, this.fieldsContainer, fieldData);
    });
    this._cdr.detectChanges();
  }

  onSubmit() {
    this._submitService.setState();
  }

  ngOnDestroy() {
    this._fieldsSubscription.unsubscribe();
  }



  // @Input() email!: string;
  // @Input() password!: string;
  // @Input() passwordVerification!: string;
  // @Input() username!: string;
  // @Input() userAvatar!: File;
  // @Input() characterName!: string;
  // @Input() characterAvatar!: File;
  // @Input() tableName!: string;
  // @Input() tableAvatar!: File;
  // @Input() noteTitle!: string;
  // @Input() noteDescription!: string;
  // @Input() required!: boolean;
  // @Input() disabled!: boolean;


  // form!: FormGroup;
  // // @Input() fields!: Fields[];



  // // fields$!: Observable<Fields[]>;

  // @Output() avatarChange = new EventEmitter<File>();

  // // value!: string;

  // // formSubmitted = inject(TrackFormSubmitService).state;

  // // onChanged!: (value: string) => void;
  // // onTouched!: () => void;

  // // constructor(private formBuilder: FormBuilder, private fieldsService: GetFieldsService) {
  // //   this.form = this.formBuilder.group({});
  // //   this.fields$ = this.fieldsService.getFields$().pipe(
  // //     tap(fields => {
  // //       // Clear existing form controls
  // //       this.form = this.formBuilder.group({}); // Reset form group
  // //       fields.forEach(field => {
  // //         const control = new FormControl(field.value || '', this.bindValidations(field));
  // //         this.form.addControl(field.name, control);
  // //       });
  // //     })
  // //   );
  // // }

  
  // onInputChange(value: string): void {
  //   if (this.disabled) {
  //     return;
  //   }

  //   this.onChanged(value);
  // }

  // ngOnInit() {
  //   // this.fields$.subscribe(fields => {
  //   //   fields.forEach(field => {
  //   //     const control = new FormControl(field.value || '', this.bindValidations(field));
  //   //     this.form.addControl(field.name, control);
  //   //   });
  //   // });
  // }
  

  // bindValidations(field: Fields): ValidatorFn | ValidatorFn[] {
  //   const validators: ValidatorFn[] = [];
  //   if (field.required) {
  //     validators.push(Validators.required);
  //   }
  //   if ('minlength' in field) {
  //     validators.push(Validators.minLength(field.minlength));
  //   }
  //   if ('maxlength' in field) {
  //     validators.push(Validators.maxLength(field.maxlength));
  //   }
  //   if ('pattern' in field) {
  //     validators.push(Validators.pattern(field.pattern));
  //   }
  //   return validators;
  // }
  

  // writeValue(value: any): void {
  //   if (value) {
  //     this.form.patchValue(value, { emitEvent: false });
  //   }
  // }

  // registerOnChange(fn: (value: string) => void): void {
  //   this.form.valueChanges.subscribe(fn);
  // }

  // registerOnTouched(fn: () => void): void {
  //   this.onTouched = fn;
  // }

  // setDisabledState(isDisabled: boolean): void {
  //   this.disabled = isDisabled;
  // }

  // markAsTouched(): void {
  //   this.onTouched();
  // }

  // onFileChange(event: Event, fieldName: string): void {
  //   const element = event.currentTarget as HTMLInputElement;
  //   let fileList: FileList | null = element.files;
  //   if (fileList && fileList.length > 0) {
  //     const file = fileList[0];
  //     this.avatarChange.emit(file);
  //     this.form.get(fieldName)?.setValue(file);
  //   }
  // }
  // // form: FormGroup = new FormGroup({
  // //   email: new FormControl(''),
  // //   password: new FormControl('')
  // // });

  // // onSubmit(){
  // //   const formData = this.form.value;
  // //   console.log(formData);
  // // }
}
