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
import { FileUploadModule } from 'primeng/fileupload';
import { CustomAddButtonComponent } from './components/custom-add-button/custom-add-button.component';



@NgModule({
  declarations: [
    CustomButtonComponent,
    CustomFormComponent,
    ListOfElementComponent,
    PageHeaderComponent,
    CustomAreaTitleComponent,
    CustomAddButtonComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterLink,  // permet aux composants réutilisables de faire du routing à travers les différents modules
    HttpClientModule,
    FileUploadModule

  ],
  exports: [
    CustomButtonComponent,
    CustomFormComponent,
    CustomAddButtonComponent,
    ListOfElementComponent,
    PageHeaderComponent,
    CustomAreaTitleComponent,
    FileUploadModule
  ]
})
export class SharedModule { }
