import { Component } from '@angular/core';
import { Purse } from '../../../../models/classes/purse-related/purse.class';

@Component({
  selector: 'app-purse',
  templateUrl: './purse.component.html',
  styleUrl: './purse.component.scss'
})
export class PurseComponent {
  purse: Purse = new Purse();
}
