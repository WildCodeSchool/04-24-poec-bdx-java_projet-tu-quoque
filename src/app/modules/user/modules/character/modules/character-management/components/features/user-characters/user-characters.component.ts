import { Component } from '@angular/core';

@Component({
  selector: 'app-user-characters',
  templateUrl: './user-characters.component.html',
  styleUrl: './user-characters.component.scss'
})
export class UserCharactersComponent {

  characterList: any = [
    {
      id: 1,
      name: "Elric"
    },
    {
      id: 2,
      name: "Boromir"
    },
    {
      id: 3,
      name: "Willow"
    },

  ]

}
