import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { DbService } from '../../../../../../shared/services/db-service/db.service';
import { Alignment } from '../../../../../models/types/alignment.type';
import { AbstractListComponent } from '../abstract-list-component.component';

@Component({
  selector: 'app-alignment-list',
  templateUrl: './alignment-list.component.html',
  styleUrl: './alignment-list.component.scss'
})
export class AlignmentListComponent extends AbstractListComponent {

  list$: Observable<Alignment[]> = this.dbService.getAlignments$();
  selectName: string = "alignment";
  selectLabel: string = "ALIGNEMENT";

  // constructor(private dbService: DbService) {
  // }
}
