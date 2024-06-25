import { Component } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Alignment } from '../../../../../models/types/alignment.type';
import { AbstractListComponent } from '../abstract-list-component.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Sheet } from '../../../../../models/types/sheet.type';

@Component({
  selector: 'app-alignment-list',
  templateUrl: './alignment-list.component.html',
  styleUrl: './alignment-list.component.scss'
})
export class AlignmentListComponent extends AbstractListComponent {
  list$: Observable<Alignment[]> = this.dbService.getAlignments$();
  selectName: string = "alignment";
  selectLabel: string = "ALIGNEMENT";
  actual$: Observable<string> = this.listener.sendInfos().pipe(
    map((sheet: Sheet) => sheet.alignment)
  );

  ngOnInit() {
    this.listener.sendInfos().pipe(
      map((sheet: Sheet) => sheet.alignment)
    );
  }
}
