import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { SharedModule } from '../../../../../../../../shared/shared.module';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextComponent } from '../../../../../../../../shared/components/custom-form/form-inputs/input-text/input-text.component';
import { Observable, Subscription, filter, finalize, firstValueFrom, map } from 'rxjs';
import { TextField } from '../../../../../../../../shared/models/types/fields/text-fields.type';
import { GetFieldsService } from '../../../../../../../../shared/services/form-field/get-fields.service';
import { ParentFormComponent } from '../../../../../../../../shared/components/parent-form/parent-form.component';
import { RegexPatterns } from '../../../../../../../../shared/models/class/regex-patterns';
import { UserInfos } from '../../../../../../../../shared/models/types/users/user-infos';
import { TableService } from '../../../../../../../../shared/services/table/table.service';
import { GameTableFullDTO } from '../../../../../../../../shared/models/types/users/table-full-dto';
import { UploadFileService } from '../../../../../../../../shared/services/uploadFile/upload-file.service';
import { UploadToFirebaseService } from '../../../../../../../../shared/services/uploadFile/upload-to-firebase.service';

@Component({
  selector: 'app-new-table',
  standalone: true,
  templateUrl: './new-table.component.html',
  styleUrl: './new-table.component.scss',
  imports: [InputTextComponent, FormsModule, ReactiveFormsModule, CommonModule, SharedModule, RouterLink]
})
export class NewTableComponent extends ParentFormComponent implements OnInit{

  tableNameField$!: Observable<TextField>;
  tableNameControl!: FormControl;
  selectedFile: File | null = null;
  private _subscription!: Subscription;
  private _uploadSubscription!: Subscription;
  userTableList$: Observable<GameTableFullDTO> | null = null;
  user: UserInfos | null = null;

  constructor(
    _fieldsService: GetFieldsService, 
    _fb: FormBuilder,
    private _uploadFileService: UploadFileService,
    private _uploadToFirebaseService: UploadToFirebaseService, 
    private _tableService: TableService, 
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    super();
    this.buildForm();
    this.initializeFormControls();
  }

  ngOnInit() {
    const userData = this._route.snapshot.data['user'];
    this.user = userData;
    this.tableNameField$ = this._fieldsService.getFields$().pipe(
      map(fields => fields.find(field => field.name === 'tableName') as TextField)
    );

    this._subscription = this._uploadFileService.selectedFile$.subscribe(
      file => {
        this.selectedFile = file;
      }
    );
   
    this._uploadSubscription = this._uploadToFirebaseService.downloadURL$
    .pipe(
      filter(url => !!url),
      finalize(() => {
        console.log('Upload process finished');
      })
    )
      .subscribe(async (url) => {
        const table: GameTableFullDTO = {
          id: 0,
          name: this.form.value.tableName,
          avatar: url as string,
          userId: this.user?.id?? 0,
          drawingList: [], 
          eventList: [], 
          noteList: [],
          playerCharacterDTOList: [] 
        };
        const userId = userData.id;
        firstValueFrom(this._tableService.postTable(userId, table))
          .then(response => {
            this._router.navigate([`/user/tables/management/my-tables/${response.id}`]);
          })
          .catch(err => {
            console.error('Error creating table:', err);
          });
      });
  }

  ngOnDestroy() {
    if (this._subscription) {
      this._subscription.unsubscribe();
    }
    if (this._uploadSubscription) {
      this._uploadSubscription.unsubscribe();
    }
  }

  protected onSubmit() {
    if (this.form.valid) {
      if (this.selectedFile) {
        this._uploadToFirebaseService.uploadFile(this.selectedFile);
      } else {
        console.log('No file selected');
      }
    } else {
      console.log('Form is not valid:', this.form.get('tableName')?.errors);
    }
  }

  protected buildForm() {
    this.form = this._fb.group({
      tableName: ['', [
        Validators.required,  
        Validators.minLength(2), 
        Validators.maxLength(50),
        Validators.pattern(RegexPatterns.textPattern)
      ]],
      imageUrl: ['']
    }, 
  );
  }

  protected initializeFormControls() {
    this.tableNameControl = this.form.get('tableName') as FormControl;
    if (!this.tableNameControl) {
      console.error('tableName control is missing!');
    }
  }
}
