import { Component } from '@angular/core';
import { InputField } from '../../../../shared/classes/input-field.class';

@Component({
  selector: 'app-first-line-inputs',
  templateUrl: './first-line-inputs.component.html',
  styleUrl: './first-line-inputs.component.scss'
})
export class FirstLineInputsComponent {
  fieldList: InputField[] = [
    new InputField("characterName", "NOM DU PERSONNAGE", "size-470"),
    new InputField("playerName", "JOUEUR", "size-470")
  ]
}
