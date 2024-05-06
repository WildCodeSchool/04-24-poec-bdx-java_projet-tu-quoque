import { Component } from '@angular/core';

@Component({
  selector: 'app-user-homepage',
  templateUrl: './user-homepage.component.html',
  styleUrl: './user-homepage.component.scss'
})
export class UserHomepageComponent {

  options: any =[
    {name: "Personnages", url: "../characters"},
    {name: "tables", url: "../tables"}
  ]
}
