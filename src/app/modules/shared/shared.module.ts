import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomButtonComponent } from './components/custom-button/custom-button.component';
import { CustomFormComponent } from './components/custom-form/custom-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListOfElementComponent } from './components/list-of-element/list-of-element.component';
import { RouterLink } from '@angular/router';



@NgModule({
  declarations: [
    CustomButtonComponent,
    CustomFormComponent,
    ListOfElementComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterLink
  ],
  exports: [
    CustomButtonComponent,
    CustomFormComponent,
    ListOfElementComponent
  ]
})
export class SharedModule { }
