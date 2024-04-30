import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'tuquoque';

  isSideBarHidden = false

  getValueFromApp(event: boolean) {
    this.isSideBarHidden = event
    console.log(event)
  }
}
