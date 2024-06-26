import { HttpClient } from '@angular/common/http';
import { Injectable, Signal } from '@angular/core';
import { TextField } from '../../models/types/fields/text-fields.type';
import { TextAreaField } from '../../models/types/fields/textarea-field.type';
import { FileField } from '../../models/types/fields/file-fields.type';
import { Observable, map } from 'rxjs';
import { Fields } from '../../models/types/fields/fields.type';
import { FormFieldsResponse } from '../../models/types/fields/formFieldsResponse.interface';

@Injectable({
  providedIn: 'root'
})
export class GetFieldsService {

  private readonly _BASE_URL = 'assets/json/form-fields/form-fields.json';
  
  constructor(private _http: HttpClient) { }

  getFields$(): Observable<Array<TextField | TextAreaField | FileField>> {
    return this._http.get<FormFieldsResponse>(this._BASE_URL)
      .pipe(
        map((response: FormFieldsResponse) => response.fields)
      );
  }
}
