import { Component } from '@angular/core';
import { TableInvitationService } from '../../../../shared/services/table-invitation/table-invitation.service';
import { Observable, map } from 'rxjs';
import { PageNavigation } from '../../../../shared/models/types/navigation/page-navigation.type';
import { TableInvitation } from '../../../../shared/models/types/users/table-invitation.type';
import { UserInfos } from '../../../../shared/models/types/users/user-infos';
import { ActivatedRoute } from '@angular/router';
import { ConnectionService } from '../../../../shared/services/connection/connection.service';

@Component({
  selector: 'app-user-homepage',
  templateUrl: './user-homepage.component.html',
  styleUrl: './user-homepage.component.scss',
})
export class UserHomepageComponent {

  buttonOptionList = [
    { name: 'Personnages', url: '../characters' },
    { name: 'Tables', url: '../tables' },
    { name: 'Invitations', url: '../table-invitation' },
  ];

  userConnected$: Observable<UserInfos | null> = this._connectionService.getUserConnected$()
  
  constructor(
    private _tableInvitation: TableInvitationService,
    private _route: ActivatedRoute,
    private _connectionService: ConnectionService
  ) {}
}
