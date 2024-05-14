import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-available-character-list',
  templateUrl: './available-character-list.component.html',
  styleUrl: './available-character-list.component.scss'
})
export class AvailableCharacterListComponent {

  @Input()
  elementList!: any;

}
