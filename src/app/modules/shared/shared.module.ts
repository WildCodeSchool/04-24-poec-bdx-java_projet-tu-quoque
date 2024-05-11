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
import { CustomAddButtonComponent } from './components/custom-add-button/custom-add-button.component';
import { ShowCommentPageComponent } from './components/show-comment-page/show-comment-page.component';
import { BackToPreviousPageDirective } from './directives/back-to-previous-page.directive';



@NgModule({
  declarations: [
    CustomButtonComponent,
    ListOfElementComponent,
    PageHeaderComponent,
    CustomAreaTitleComponent,
    CustomAddButtonComponent,
    ShowCommentPageComponent,
    BackToPreviousPageDirective,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterLink,  // permet aux composants réutilisables de faire du routing à travers les différents modules
    HttpClientModule,
    FileUploadModule,
    AutoCompleteModule

  ],
  exports: [
    CustomButtonComponent,
    CustomAddButtonComponent,
    ListOfElementComponent,
    PageHeaderComponent,
    CustomAreaTitleComponent,
    FileUploadModule,
    AutoCompleteModule,
    ShowCommentPageComponent,
    BackToPreviousPageDirective
  ]
})
export class SharedModule { }
