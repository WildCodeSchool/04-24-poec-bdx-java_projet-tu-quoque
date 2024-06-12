import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { SharedModule } from '../../../../../../../../shared/shared.module';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextComponent } from '../../../../../../../../shared/components/custom-form/form-inputs/input-text/input-text.component';
import { Observable, Subscription, filter, firstValueFrom, map } from 'rxjs';
import { TextField } from '../../../../../../../../shared/models/types/fields/text-fields.type';
import { GetFieldsService } from '../../../../../../../../shared/services/form-field/get-fields.service';
import { ParentFormComponent } from '../../../../../../../../shared/components/parent-form/parent-form.component';
import { RegexPatterns } from '../../../../../../../../shared/models/class/regex-patterns';
import { UploadFileService } from '../../../../../../../../shared/services/uploadFile/upload-file.service';
import { UploadToFirebaseService } from '../../../../../../../../shared/services/uploadFile/upload-to-firebase.service';
import { CharacterService } from '../../../../../../../../shared/services/character/character.service';
import { CharacterFullDTO } from '../../../../../../../../shared/models/types/users/character-full-dto';
import { HttpClient } from '@angular/common/http';
import { UserInfos } from '../../../../../../../../shared/models/types/users/user-infos';
import { GameTableDTO } from '../../../../../../../../shared/models/types/users/table-dto';

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
  selectedFile: File | null = null;
  private _subscription!: Subscription;
  private _uploadSubscription!: Subscription;
  userCharacterList$: Observable<CharacterFullDTO[]> | null = null;
  user: UserInfos | null = null;

  constructor(
    _fieldsService: GetFieldsService, 
    _fb: FormBuilder,
    private _uploadFileService: UploadFileService,
    private _uploadToFirebaseService: UploadToFirebaseService, 
    private _characterService: CharacterService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {
    super();
    this.buildForm();
    this.initializeFormControls();
  }

  ngOnInit() {
    const userData = this._route.snapshot.data['user'];
    this.user = userData;
    this.characterNameField$ = this._fieldsService.getFields$().pipe(
      map(fields => fields.find(field => field.name === 'characterName') as TextField)
    );

    this._subscription = this._uploadFileService.selectedFile$.subscribe(
      file => {
        this.selectedFile = file;
      }
    );

    this._uploadSubscription = this._uploadToFirebaseService.downloadURL$
      .pipe(filter(url => !!url))
      .subscribe(async (url) => {
        const character: CharacterFullDTO = {
          id:0,
          name: this.form.value.characterName,
          avatar: url as string,
          accepted: false,
          gameTable: {} as GameTableDTO,
          characterSheetId: 0,
          characterNoteList: []
        };
        const userId = userData.id;
        try {
          const response = await firstValueFrom(this._characterService.postCharacter(userId, character));
          console.log('character created:', response);
          this._router.navigate([`/user/characters/management/my-characters/${response.id}`]);
        } catch (err) {
          console.error('Error creating character:', err);
        }
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
      console.log('Form is not valid:', this.form.get('characterName')?.errors);
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
      imageUrl: ['']
    });
  }

  protected initializeFormControls() {
    this.characterNameControl = this.form.get('characterName') as FormControl;
    if (!this.characterNameControl) {
      console.error('characterName control is missing!');
    }
  }
}
