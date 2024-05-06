import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { DbService } from '../../../../shared/services/db-service/db.service';
import { Alignment } from '../../../models/types/alignment.type';

@Component({
  selector: 'app-alignment-list',
  templateUrl: './alignment-list.component.html',
  styleUrl: './alignment-list.component.scss'
})
export class AlignmentListComponent {
  list$!: Observable<Alignment[]>;
  selectName: string = "alignment";
  selectLabel: string = "ALIGNEMENT";

  constructor(private dbService: DbService) {

  }

  ngOnInit(): void {
    this.list$ = this.dbService.getAlignments$();
  }
}
