import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { DbService } from '../../../../shared/services/db-service/db.service';
import { Gender } from '../../../models/types/gender.type';

@Component({
  selector: 'app-gender-list',
  templateUrl: './gender-list.component.html',
  styleUrl: './gender-list.component.scss'
})
export class GenderListComponent {
  list$: Observable<Gender[]> = this.dbService.getGenders$();
  selectName: string = "gender";
  selectLabel: string = "SEXE";

  constructor(private dbService: DbService) {

  }
}
