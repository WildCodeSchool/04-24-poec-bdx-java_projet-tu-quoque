import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Alignment } from '../../../../../models/types/alignment.type';
import { AbstractListComponent } from '../abstract-list-component.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-alignment-list',
  templateUrl: './alignment-list.component.html',
  styleUrl: './alignment-list.component.scss'
})
export class AlignmentListComponent extends AbstractListComponent {
  list$: Observable<Alignment[]> = this.dbService.getAlignments$();
  selectName: string = "alignment";
  selectLabel: string = "ALIGNEMENT";
  actual: string = "";

  ngOnInit() {
    this.listener.sendInfos().pipe(
      takeUntilDestroyed(this.destroyRef),
    ).subscribe(sheet => {
      this.actual = sheet.alignment;
    })
  }
}
