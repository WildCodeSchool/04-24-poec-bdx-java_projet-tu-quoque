import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-header-button',
  templateUrl: './header-button.component.html',
  styleUrl: './header-button.component.scss'
})
export class HeaderButtonComponent {

  @Input() picture: string = "assets/images/profile-img-test.jpg"
}
