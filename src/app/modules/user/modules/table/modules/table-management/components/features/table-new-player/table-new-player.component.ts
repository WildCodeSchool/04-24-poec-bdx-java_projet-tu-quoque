import { Component, DestroyRef } from '@angular/core';
import { userService } from '../../../../../../../../shared/services/users/user.service';
import { Observable } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

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

    

  constructor(
    private _userService: userService,
    private destroyRef: DestroyRef
  ) {}

  searchUser(event: any): void {
    this._userService.getUserByName$(event.query)
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe();
  }

  addNewUser(): void {}
}
