import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { UploadTaskSnapshot } from 'firebase/storage';
import { BehaviorSubject, Observable, filter, finalize, switchMap, tap } from 'rxjs';

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
    task.snapshotChanges()
      .pipe(
        filter((s: any) => s.state === 'success'),
        switchMap(() => fileRef.getDownloadURL()
          .pipe(
            tap(url => this._downloadURL$.next(url)),
          ))
      ).subscribe();
  }
}
