import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ColorService {
  
  private colorSubject = new Subject<{ color: string, lineWidth: number }>();
  color$ = this.colorSubject.asObservable();

  setColor(color: string, lineWidth: number) {
    this.colorSubject.next({ color, lineWidth });
  }
}
