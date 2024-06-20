import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { userService } from '../../../../../../../../shared/services/users/user.service';
import { UserBasicInfos } from '../../../../../../../../shared/models/types/users/user-basic-infos.type';
import { CharacterService } from '../../../../../../../../shared/services/character/character.service';
import { CharacterAvatarDTO } from '../../../../../../../../shared/models/types/users/character-avatar-DTO';

@Component({
  selector: 'app-characters-to-accept',
  templateUrl: './characters-to-accept.component.html',
  styleUrl: './characters-to-accept.component.scss',
})
export class CharactersToAcceptComponent implements OnInit {

  tableId!: number;
  userInvitedList$: Observable<UserBasicInfos[]> =
    this._userService.getTableUserInvited$();
  characterOnHoldList$: Observable<CharacterAvatarDTO[]> =
    this._characterService.getCharacterOnHoldList$();
  constructor(
    private _route: ActivatedRoute,
    private _userService: userService,
    private _characterService: CharacterService
  ) {}

  ngOnInit(): void {
    this.tableId = Number(this._route.snapshot.paramMap.get('id'));

    this._userService.setTableUserInvited(this.tableId);
    this._characterService.setCharacterOnHoldList(this.tableId);
  }
}
