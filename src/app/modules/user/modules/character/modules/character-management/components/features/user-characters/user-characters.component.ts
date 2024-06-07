import { Component } from '@angular/core';
import { CharacterService } from '../../../../../../../../shared/services/character/character.service';
import { Observable } from 'rxjs';
import { Character } from '../../../../../../../../shared/models/types/users/character.type';
import { UserInfos } from '../../../../../../../../shared/models/types/users/user-infos';
import { ActivatedRoute } from '@angular/router';
import { ConnectionService } from '../../../../../../../../shared/services/connection/connection.service';

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
    console.log(this.user)
 
  }

  // private loadUserCharacters(id: number): void {
  //   if (this.user) {
  //     this.userCharacterList$ = this._characterService.getUserCharacterListNew$(id);
  //   }
  // }
  // userCharacterList$: Observable<Character[]> =
  //   this._characterService.getUserCharacterList$();

  // constructor(private _characterService: CharacterService) {}
}
