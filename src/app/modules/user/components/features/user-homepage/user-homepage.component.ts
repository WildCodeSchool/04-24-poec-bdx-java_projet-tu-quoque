import { Component } from '@angular/core';
import { TableInvitationService } from '../../../../shared/services/table-invitation/table-invitation.service';
import { Observable, map } from 'rxjs';
import { PageNavigation } from '../../../../shared/models/types/navigation/page-navigation.type';
import { TableInvitation } from '../../../../shared/models/types/users/table-invitation.type';
import { UserInfos } from '../../../../shared/models/types/users/user-infos';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-homepage',
  templateUrl: './user-homepage.component.html',
  styleUrl: './user-homepage.component.scss',
})
export class UserHomepageComponent {
  user: UserInfos | null = null;

  buttonOptionList = [
    { name: 'Personnages', url: '../characters' },
    { name: 'Tables', url: '../tables' },
    { name: 'Invitations', url: '../table-invitation' },
  ];
  invitationList$: Observable<TableInvitation[]> =
    this._tableInvitation.getUserTableInvitationList$();

  constructor(
    private _tableInvitation: TableInvitationService,
    private _route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const userData = this._route.snapshot.data['user'];
    this.user = userData; 
    console.log(this.user)
  }

}
