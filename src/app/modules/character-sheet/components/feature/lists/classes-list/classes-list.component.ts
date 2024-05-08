import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CharacterClass } from '../../../../models/types/character-class.type';
import { DbService } from '../../../../../shared/services/db-service/db.service';

@Component({
  selector: 'app-classes-list',
  templateUrl: './classes-list.component.html',
  styleUrl: './classes-list.component.scss'
})
export class ClassesListComponent {
  classList$: Observable<CharacterClass[]> = this.dbService.getClasses$();
  selectName: string = "characterClass";
  selectLabel: string = "CLASSE";

  constructor(private dbService: DbService) {
  }

}
