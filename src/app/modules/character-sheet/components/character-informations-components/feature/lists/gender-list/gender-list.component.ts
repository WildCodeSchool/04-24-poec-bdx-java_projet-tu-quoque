import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Gender } from '../../../../../models/types/gender.type';
import { AbstractListComponent } from '../abstract-list-component.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-gender-list',
  templateUrl: './gender-list.component.html',
  styleUrl: './gender-list.component.scss'
})
export class GenderListComponent extends AbstractListComponent {
  list$: Observable<Gender[]> = this.dbService.getGenders$();
  selectName: string = "gender";
  selectLabel: string = "SEXE";
  actual: string = "";

  ngOnInit() {
    this.listener.sendInfos().pipe(
      takeUntilDestroyed(this.destroyRef),
    ).subscribe(sheet => {
      this.actual = sheet.gender;
    })
  }
}
