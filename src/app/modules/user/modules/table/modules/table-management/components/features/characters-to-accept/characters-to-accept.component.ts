import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Character } from '../../../../../../../../shared/models/types/users/character.type';
import { UserInfos } from '../../../../../../../../shared/models/types/users/user-infos';
import { userService } from '../../../../../../../../shared/services/users/user.service';
import { UserBasicInfos } from '../../../../../../../../shared/models/types/users/user-basic-infos.type';

@Component({
  selector: 'app-characters-to-accept',
  templateUrl: './characters-to-accept.component.html',
  styleUrl: './characters-to-accept.component.scss',
})
export class CharactersToAcceptComponent implements OnInit {
  tableId!: number;
  userInvitedList!: UserBasicInfos[];
  constructor(
    private _route: ActivatedRoute,
    private _userService: userService
  ) {}

  ngOnInit(): void {
    this.tableId = Number(this._route.snapshot.paramMap.get('id'));
    this.loadUserInvitedList();
  }

  private loadUserInvitedList(): void {
    this._userService
      .getTableUserInvitedList$(this.tableId)
      .subscribe((users: UserBasicInfos[]) => (this.userInvitedList = users));
  }
}
