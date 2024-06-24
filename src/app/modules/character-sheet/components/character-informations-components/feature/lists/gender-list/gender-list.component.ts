import { Component } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Gender } from '../../../../../models/types/gender.type';
import { AbstractListComponent } from '../abstract-list-component.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Sheet } from '../../../../../models/types/sheet.type';

@Component({
  selector: 'app-gender-list',
  templateUrl: './gender-list.component.html',
  styleUrl: './gender-list.component.scss'
})
export class GenderListComponent extends AbstractListComponent {
  list$: Observable<Gender[]> = this.dbService.getGenders$();
  selectName: string = "gender";
  selectLabel: string = "SEXE";
  actual$: Observable<string> = this.listener.sendInfos().pipe(
    map((sheet: Sheet) => sheet.gender)
  );

  ngOnInit() {
    this.listener.sendInfos().pipe(
      map((sheet: Sheet) => sheet.gender)
    );
  }
}
