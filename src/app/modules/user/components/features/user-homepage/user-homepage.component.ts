import { Component } from '@angular/core';
import { TableInvitationService } from '../../../../shared/services/table-invitation/table-invitation.service';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-user-homepage',
  templateUrl: './user-homepage.component.html',
  styleUrl: './user-homepage.component.scss',
})
export class UserHomepageComponent {

  invitationArray$: Observable<any> = this._tableInvitation.getUserTableInvitationList$();

  constructor(private _tableInvitation: TableInvitationService) {}

  buttonOptionList$: Observable<any> = this.invitationArray$.pipe(
    map((invitationArray: any) =>
      invitationArray.length
        ? [
            { name: 'Personnages', url: '../characters' },
            { name: 'tables', url: '../tables' },
            { name: 'invitations', url: '../table-invitation' },
          ]
        : [
            { name: 'Personnages', url: '../characters' },
            { name: 'tables', url: '../tables' },
          ]
    )
  );
}
