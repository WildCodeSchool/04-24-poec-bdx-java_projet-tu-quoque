import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ColorService {
  private colorSubject = new BehaviorSubject<{ color: string, lineWidth: number }>({ color: 'black', lineWidth: 2 });

  color$ = this.colorSubject.asObservable();

  setColor(color: string, lineWidth: number) {
    this.colorSubject.next({ color, lineWidth });
  }

  getCurrentColor(): string {
    return this.colorSubject.value.color;
  }

  getCurrentLineWidth(): number {
    return this.colorSubject.value.lineWidth;
  }
}
