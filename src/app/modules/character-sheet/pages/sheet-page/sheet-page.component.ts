import { Component, OnInit } from '@angular/core';
import { DbService } from '../../../shared/services/db-service/db.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-sheet-page',
  templateUrl: './sheet-page.component.html',
  styleUrl: './sheet-page.component.scss'
})
export class SheetPageComponent implements OnInit {
  raceList$!: Observable<any>;

  constructor(private dbService: DbService) {

  }

  ngOnInit(): void {
    this.raceList$ = this.dbService.getRaces$();
  }

}
