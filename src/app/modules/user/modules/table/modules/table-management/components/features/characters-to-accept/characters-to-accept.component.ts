import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Character } from '../../../../../../../../shared/models/types/users/character.type';
import { UserInfos } from '../../../../../../../../shared/models/types/users/user-infos';
import { userService } from '../../../../../../../../shared/services/users/user.service';
import { UserBasicInfos } from '../../../../../../../../shared/models/types/users/user-basic-infos.type';
import { CharacterService } from '../../../../../../../../shared/services/character/character.service';
import { CharacterDTO } from '../../../../../../../../shared/models/types/users/character-dto';
import { CharacterAvatarDTO } from '../../../../../../../../shared/models/types/users/character-avatar-DTO';

@Component({
  selector: 'app-characters-to-accept',
  templateUrl: './characters-to-accept.component.html',
  styleUrl: './characters-to-accept.component.scss',
})
export class CharactersToAcceptComponent implements OnInit {
  tableId!: number;
  userInvitedList!: UserBasicInfos[];
  characterOnHoldList!: CharacterAvatarDTO[];
  constructor(
    private _route: ActivatedRoute,
    private _userService: userService,
    private _characterService: CharacterService
  ) {}

  ngOnInit(): void {
    this.tableId = Number(this._route.snapshot.paramMap.get('id'));
    this.loadUserInvitedList();
    this._characterService
      .getCharacterOnHoldList$(this.tableId)
      .subscribe((characterList: CharacterAvatarDTO[]) => {
        (this.characterOnHoldList = characterList), console.log(this.characterOnHoldList);
      });
  }

  private loadUserInvitedList(): void {
    this._userService
      .getTableUserInvitedList$(this.tableId)
      .subscribe((users: UserBasicInfos[]) => (this.userInvitedList = users));
  }
}
