import { Component } from '@angular/core';
import { userService } from '../../../../../../../../shared/services/users/user.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-table-new-player',
  templateUrl: './table-new-player.component.html',
  styleUrl: './table-new-player.component.scss',
})
export class TableNewPlayerComponent {
  
  selectedUser!: string;
  inputText: string = '';

  suggestions$: Observable<any> =
    this._userService.getUserListFilteredByName$();

  constructor(private _userService: userService) {}

  searchUser(event: any): void {
    this._userService.getUserByName$(event.query).subscribe();
  }

  addNewUser(): void {}
}
