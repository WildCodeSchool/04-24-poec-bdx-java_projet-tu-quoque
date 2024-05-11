import { Component } from '@angular/core';
import { UsersService } from '../../../../../../../../shared/services/users/users.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-table-new-player',
  templateUrl: './table-new-player.component.html',
  styleUrl: './table-new-player.component.scss',
})
export class TableNewPlayerComponent {

  inputText:string =""
  selectedUser!: string
  suggestions: Observable<any> = this._usersService.getUserListFilteredByName$()

  constructor(private _usersService: UsersService){}


  searchUser(event: any): void {
    this._usersService.getUserByName$(event.query).subscribe()
  }

  addNewUser(): void {
    console.log(`${this.selectedUser} à reçu une invitation !`)
  }
}
