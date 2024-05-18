import { Component } from '@angular/core';
import { TableInvitationService } from '../../../../shared/services/table-invitation/table-invitation.service';
import { Observable, map } from 'rxjs';
import { PageNavigation } from '../../../../shared/models/types/navigation/page-navigation.type';
import { TableInvitation } from '../../../../shared/models/types/users/table-invitation.type';

@Component({
  selector: 'app-user-homepage',
  templateUrl: './user-homepage.component.html',
  styleUrl: './user-homepage.component.scss',
})
export class UserHomepageComponent {

  private invitationArray$: Observable<TableInvitation[]> =
    this._tableInvitation.getUserTableInvitationList$();

  constructor(private _tableInvitation: TableInvitationService) {}

  buttonOptionList$: Observable<PageNavigation[]> = this.invitationArray$.pipe(
    map((invitationArray: TableInvitation[]) =>
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
