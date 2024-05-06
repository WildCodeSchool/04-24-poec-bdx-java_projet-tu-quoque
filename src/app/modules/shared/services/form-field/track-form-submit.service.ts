import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TrackFormSubmitService {

  state = signal<boolean>(false);



  setState(): void {
    this.state.set(true);
  }
}
