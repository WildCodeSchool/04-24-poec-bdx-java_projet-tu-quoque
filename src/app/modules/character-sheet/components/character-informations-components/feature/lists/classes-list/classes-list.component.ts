import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { CharacterClass } from '../../../../../models/types/character-class.type';
import { AbstractListComponent } from '../abstract-list-component.component';

@Component({
  selector: 'app-classes-list',
  templateUrl: './classes-list.component.html',
  styleUrl: './classes-list.component.scss'
})
export class ClassesListComponent extends AbstractListComponent {
  classList$: Observable<CharacterClass[]> = this.dbService.getClasses$();
  selectName: string = "characterClass";
  selectLabel: string = "CLASSE";
}
