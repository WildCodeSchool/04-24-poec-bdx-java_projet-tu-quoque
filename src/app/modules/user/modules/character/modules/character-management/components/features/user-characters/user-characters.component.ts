import { Component } from '@angular/core';
import { CharacterService } from '../../../../../../../../shared/services/character/character.service';
import { Observable } from 'rxjs';
import { Character } from '../../../../../../../../shared/models/types/users/character.type';
import { UserInfos } from '../../../../../../../../shared/models/types/users/user-infos';
import { ActivatedRoute } from '@angular/router';
import { ConnectionService } from '../../../../../../../../shared/services/connection/connection.service';
import { CharacterDTO } from '../../../../../../../../shared/models/types/users/character-dto';

@Component({
  selector: 'app-user-characters',
  templateUrl: './user-characters.component.html',
  styleUrl: './user-characters.component.scss',
})
export class UserCharactersComponent {
  characterList$: Observable<CharacterDTO[] | null> = this._characterService.getCharacterList$()
  user: UserInfos | null = null;
  constructor(
    private _characterService: CharacterService,
    private _route: ActivatedRoute,
    private _connectionService: ConnectionService
  ) {}

  ngOnInit(): void {
    const userData = this._route.snapshot.data['user'];
    this.user = userData;
    if(this.user?.playerCharacterList) {
      this._characterService.setCharacterList(this.user.playerCharacterList);
    }
  }
}
