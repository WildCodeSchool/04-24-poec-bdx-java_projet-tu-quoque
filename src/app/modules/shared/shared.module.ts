import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomButtonComponent } from './components/custom-button/custom-button.component';
import { CustomFormComponent } from './components/custom-form/custom-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListOfElementComponent } from './components/list-of-element/list-of-element.component';
import { RouterLink } from '@angular/router';
import { PageHeaderComponent } from './components/page-header/page-header.component';
import { CustomAreaTitleComponent } from './components/custom-area-title/custom-area-title.component';
import { HttpClientModule } from '@angular/common/http';




@NgModule({
  declarations: [
    CustomButtonComponent,
    CustomFormComponent,
    ListOfElementComponent,
    PageHeaderComponent,
    CustomAreaTitleComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
    HttpClientModule

  ],
  exports: [
    CustomButtonComponent,
    CustomFormComponent,
    ListOfElementComponent,
    PageHeaderComponent,
    CustomAreaTitleComponent
  ]
})
export class SharedModule { }
