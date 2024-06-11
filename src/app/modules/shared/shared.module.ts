import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomButtonComponent } from './components/custom-button/custom-button.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListOfElementComponent } from './components/list-of-element/list-of-element.component';
import { RouterLink } from '@angular/router';
import { PageHeaderComponent } from './components/page-header/page-header.component';
import { CustomAreaTitleComponent } from './components/custom-area-title/custom-area-title.component';
import { HttpClientModule } from '@angular/common/http';
import { FileUploadModule } from 'primeng/fileupload'; // import primeNG
import { AutoCompleteModule } from 'primeng/autocomplete'; // import primeNG
import { AccordionModule } from 'primeng/accordion'; // import primeNG
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { CustomAddButtonComponent } from './components/custom-add-button/custom-add-button.component';
import { ShowCommentPageComponent } from './components/show-comment-page/show-comment-page.component';
import { BackToPreviousPageDirective } from './directives/back-to-previous-page.directive';
import { BaseInputComponent } from './components/custom-form/form-inputs/base-input/base-input.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { ReturnButtonComponent } from './components/return-button/return-button.component';
import { FileUploadComponent } from './components/file-upload/file-upload.component';

@NgModule({
  declarations: [
    CustomButtonComponent,
    ListOfElementComponent,
    PageHeaderComponent,
    CustomAreaTitleComponent,
    CustomAddButtonComponent,
    ShowCommentPageComponent,
    BackToPreviousPageDirective,
    ReturnButtonComponent,
    FileUploadComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
    HttpClientModule,
    FileUploadModule,
    AutoCompleteModule,
    FullCalendarModule,
    AccordionModule,
    DynamicDialogModule,
    FormsModule
  ],
  exports: [
    CustomButtonComponent,
    CustomAddButtonComponent,
    ListOfElementComponent,
    PageHeaderComponent,
    CustomAreaTitleComponent,
    ReturnButtonComponent,
    FileUploadModule,
    AutoCompleteModule,
    ShowCommentPageComponent,
    BackToPreviousPageDirective,
    FullCalendarModule,
    AccordionModule,
    DynamicDialogModule,
    FormsModule,
    ReactiveFormsModule,
    FormsModule,
    FileUploadComponent,
  ],
})
export class SharedModule {}
