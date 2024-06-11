import { Component, DestroyRef, OnInit } from '@angular/core';
import { InputTextComponent } from '../custom-form/form-inputs/input-text/input-text.component';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { SharedModule } from '../../shared.module';
import { Observable, map } from 'rxjs';
import { TextField } from '../../models/types/fields/text-fields.type';
import { GetFieldsService } from '../../services/form-field/get-fields.service';
import { InputTextareaComponent } from '../custom-form/form-inputs/input-textarea/input-textarea.component';
import { TextAreaField } from '../../models/types/fields/textarea-field.type';
import { ParentFormComponent } from '../parent-form/parent-form.component';
import { RegexPatterns } from '../../models/class/regex-patterns';
import { UserInfos } from '../../models/types/users/user-infos';
import { environment } from '../../../../../environments/environment.development';
import { NoteService } from '../../services/note/note.service';
import { GameTableFullDTO } from '../../models/types/users/table-full-dto';
import { CharacterFullDTO } from '../../models/types/users/character-full-dto';
import { ConnectionService } from '../../services/connection/connection.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-add-note-page',
  standalone: true,
  templateUrl: './add-note-page.component.html',
  styleUrl: './add-note-page.component.scss',
  imports: [
    InputTextComponent,
    InputTextareaComponent,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    SharedModule,
    RouterLink,
  ],
})
export class AddNotePageComponent
  extends ParentFormComponent
  implements OnInit
{
  user!: UserInfos;
  role!: string;
  tableConnected!: GameTableFullDTO | null;
  characterConnected!: CharacterFullDTO | null;
  private readonly _BASE_URL: string = environment.baseUrl + '/notes';

  nameField$!: Observable<TextField>;
  nameControl!: FormControl;
  textField$!: Observable<TextAreaField>;
  textControl!: FormControl;

  constructor(
    _fieldsService: GetFieldsService,
    _fb: FormBuilder,
    private _route: ActivatedRoute,
    private _router: Router,
    private _noteService: NoteService,
    private _connectionService: ConnectionService,
    private _destroyRef: DestroyRef
  ) {
    super();
    this.buildForm();
    this.initializeFormControls();
  }

  ngOnInit() {
    this.nameField$ = this._fieldsService
      .getFields$()
      .pipe(
        map(
          (fields) => fields.find((field) => field.name === 'name') as TextField
        )
      );
    this.textField$ = this._fieldsService
      .getFields$()
      .pipe(
        map(
          (fields) =>
            fields.find((field) => field.name === 'text') as TextAreaField
        )
      );
    const userData = this._route.snapshot.data['user'];
    this.user = userData;
    this.role = this._route.snapshot.paramMap.get('role') as string;

    this._connectionService
      .getTableConnectedNew$()
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe(
        (response: GameTableFullDTO | null) => (this.tableConnected = response)
      );
    this._connectionService
      .getCharacterConnectedNew$()
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe(
        (response: CharacterFullDTO | null) =>
          (this.characterConnected = response)
      );
  }

  protected onSubmit() {
    if (this.form.valid) {
      if (this.role === 'user') {
        this._noteService
          .postUserNote(this.form.value, this.user.id)
          .pipe(takeUntilDestroyed(this._destroyRef))
          .subscribe();
        this._router.navigateByUrl(`notepad/user/notes`);
      } else if (this.tableConnected) {
        this._noteService
          .postTableNote(this.form.value, this.tableConnected.id)
          .pipe(takeUntilDestroyed(this._destroyRef))
          .subscribe();
        this._router.navigateByUrl(`notepad/game/notes`);
      } else if (this.characterConnected) {
        this._router.navigateByUrl(`notepad/game/notes`);
        this._noteService
          .postCharacterNote(this.form.value, this.characterConnected.id)
          .pipe(takeUntilDestroyed(this._destroyRef))
          .subscribe();
      }
    } else {
      console.log(
        'Form is not valid:',
        this.form.get('name')?.errors,
        this.form.get('text')
      );
    }
  }

  protected buildForm() {
    this.form = this._fb.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(50),
          Validators.pattern(RegexPatterns.textPattern),
        ],
      ],
      text: ['', [Validators.required]],
    });
  }

  protected initializeFormControls() {
    this.nameControl = this.form.get('name') as FormControl;
    if (!this.nameControl) {
      console.error('name control is missing!');
    }
    this.textControl = this.form.get('text') as FormControl;
    if (!this.textControl) {
      console.error('text control is missing!');
    }
  }
}
