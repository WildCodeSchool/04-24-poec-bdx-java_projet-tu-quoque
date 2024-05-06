import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-character-presentation',
  templateUrl: './character-presentation.component.html',
  styleUrl: './character-presentation.component.scss'
})
export class CharacterPresentationComponent {

  @Input()
  character!: any
}
