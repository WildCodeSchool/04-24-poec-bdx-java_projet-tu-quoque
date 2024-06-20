import { Component, Input } from '@angular/core';
import { ControlValueAccessor, NgForm } from '@angular/forms';
import { UploadFileService } from '../../services/uploadFile/upload-file.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.scss'
})
export class FileUploadComponent implements ControlValueAccessor {
  @Input() id!: string;
  @Input() name!: string;  
  @Input()labelFor!: string;
  @Input() labelContent!: string;
  @Input() form!: NgForm;

  imgUrl: string | null = null;
  onChanged!: (value: string) => void;
  onTouched!: () => void;
  preview: string = "";

  constructor(private _uploadFileService: UploadFileService) {}

  writeValue(value: string): void {
      this.imgUrl = value;
  }

  registerOnChange(fn: (value: string) => void): void {
      this.onChanged = fn;
  }

  registerOnTouched(fn: () => void): void {
      this.onTouched = fn;
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    
    if (file) {
      this.preview = URL.createObjectURL(file)
      this._uploadFileService.setSelectedFile(file)
    }
  }

}
