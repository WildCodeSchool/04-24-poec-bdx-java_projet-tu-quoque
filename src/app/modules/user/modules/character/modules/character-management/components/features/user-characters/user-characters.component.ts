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
    this._route.data.subscribe((data) => {
      console.log(data);
      this.user = data['user'];
      if (!this.user) {
        this._connectionService.personalInfo();
      // } else {
      //   if(this.user)this.loadUserCharacters(this.user.id);
      // }
    
  }});
  this._connectionService.getUserConnected$().subscribe(data => console.log(data?.name));
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
