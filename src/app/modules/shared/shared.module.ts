import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomButtonComponent } from './components/custom-button/custom-button.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputErrorComponent } from './components/custom-form/errors/input-error/input-error.component';



@NgModule({
  declarations: [
    CustomButtonComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    CustomButtonComponent,
  ]
})
export class SharedModule { }
