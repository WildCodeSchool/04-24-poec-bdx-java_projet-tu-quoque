import { Component } from '@angular/core';
import { map, Observable } from 'rxjs';
import { CharacterClass } from '../../../../../models/types/character-class.type';
import { AbstractListComponent } from '../abstract-list-component.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Sheet } from '../../../../../models/types/sheet.type';

@Component({
  selector: 'app-classes-list',
  templateUrl: './classes-list.component.html',
  styleUrl: './classes-list.component.scss'
})
export class ClassesListComponent extends AbstractListComponent {
  classList$: Observable<CharacterClass[]> = this.dbService.getClasses$();
  selectName: string = "characterClass";
  selectLabel: string = "CLASSE";
  actual$: Observable<string> = this.listener.sendInfos().pipe(
    map((sheet: Sheet) => sheet.characterClass)
  );

  ngOnInit() {
    this.listener.sendInfos().pipe(
      map((sheet: Sheet) => sheet.characterClass)
    );
  }
}
