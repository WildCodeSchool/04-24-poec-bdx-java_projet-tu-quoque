import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ColorService {
  
  private colorSubject = new Subject<string>();
  color$ = this.colorSubject.asObservable();

  setColor(color: string) {
    this.colorSubject.next(color);
  }
}
