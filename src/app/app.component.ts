import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'tuquoque';

  isSideBarHidden!: boolean

  getValueFromApp(event: boolean) {
    this.isSideBarHidden = event
  }
}
