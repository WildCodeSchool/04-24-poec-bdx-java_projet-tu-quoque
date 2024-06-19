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
  userCharacterList$: Observable<Character[]> | null = null;
  user: UserInfos | null = null;
  constructor(
    private _characterService: CharacterService,
    private _route: ActivatedRoute,
    private _connectionService: ConnectionService
  ) {}

  ngOnInit(): void {
    const userData = this._route.snapshot.data['user'];
    this.user = userData;
    // this._connectionService.setUserConnected(userData) --> set le user dans le service donc devoir aussi :
    // this._connectionService.setUserCharacterList(userData.playerCharacterList) nouveau behavior subject a rajouter dans le service
    // ici on prendra plutot le behavior subjet useCharacterList pour display dans le html
    //
  }

  // addElement(characterId: number): void {
  //   if(this.user?.playerCharacterList) {
  //     const characterList = this.user.playerCharacterList
  //     // this.user.playerCharacterList = [...this.user.playerCharacterList, {id:9, name: "bonobo"} ] --> pour ajouter un character
  //     //quand on clique sur un personnage ça le supprime, meme logique
  //     // décaler la logique dans le service donc:
  //     // créer une méthode pour next la

  //     const characterListUpdated = characterList.filter(
  //       (character: CharacterDTO) => character.id !== characterId
  //     );
  //     this.characterList$.next(characterList);
  //     return this._http.delete(this._BASE_URL + `/delete/${eventId}`, {
  //       headers,
  //     });
  //   }
  // }
}
