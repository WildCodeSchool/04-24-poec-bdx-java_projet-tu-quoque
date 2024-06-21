import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { BehaviorSubject, Observable, finalize, switchMap, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadToFirebaseService {
  private _downloadURL$ = new BehaviorSubject<string | null>(null);

  constructor(private storage: AngularFireStorage) { }

  get downloadURL$(): Observable<string | null> {
    return this._downloadURL$.asObservable();
  }

  uploadFile(file: File): void {
    const filePath = `images/${file.name}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);
   
    task.snapshotChanges().pipe(
      switchMap(() => fileRef.getDownloadURL().pipe(
        tap(url => this._downloadURL$.next(url)),
        finalize(() => this._downloadURL$.complete())
      ))
    ).subscribe();
  }
}
