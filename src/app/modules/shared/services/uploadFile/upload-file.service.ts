import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {
  private selectedFileSubject = new BehaviorSubject<File | null>(null);
  selectedFile$ = this.selectedFileSubject.asObservable();

  setSelectedFile(file: File | null): void {
    this.selectedFileSubject.next(file);
    if (file) {
      console.log(`Selected file set: ${file.name}`);
    } else {
      console.log('Selected file cleared');
    }
  }

  getSelectedFile(): File | null {
    return this.selectedFileSubject.getValue();
  }
}
