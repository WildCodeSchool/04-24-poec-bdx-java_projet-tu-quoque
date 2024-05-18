import { Component } from '@angular/core';
import { CharacterService } from '../../../../../../../../shared/services/character/character.service';
import { Observable } from 'rxjs';
import { Character } from '../../../../../../../../shared/models/types/users/character.type';

@Component({
  selector: 'app-user-characters',
  templateUrl: './user-characters.component.html',
  styleUrl: './user-characters.component.scss',
})
export class UserCharactersComponent {
  
  userCharacterList$: Observable<Character[]> =
    this._characterService.getUserCharacterList$();

  constructor(private _characterService: CharacterService) {}
}
