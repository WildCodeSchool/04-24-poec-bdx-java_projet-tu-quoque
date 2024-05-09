import { Component } from '@angular/core';
import { CharacterService } from '../../../../../../../../shared/services/character/character.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-characters',
  templateUrl: './user-characters.component.html',
  styleUrl: './user-characters.component.scss',
})
export class UserCharactersComponent {
  userCharacterList: Observable<any> = this._characterService.getUserCharacterList$()

  constructor(private _characterService: CharacterService){}

}
