import { Component } from '@angular/core';

@Component({
  selector: 'app-visitor-homepage',
  templateUrl: './visitor-homepage.component.html',
  styleUrl: './visitor-homepage.component.scss'
})
export class VisitorHomepageComponent {

  tableFunction: string = 'assets/images/visitor-homepage/table-function.jpg';
  characterFunction: string = 'assets/images/visitor-homepage/character-function.jpg';
  organisationFunction: string = 'assets/images/visitor-homepage/organisation-function.jpg';
  noteFunction: string = 'assets/images/visitor-homepage/note-function.jpg';
}
