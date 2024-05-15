import { Component } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Level } from '../../../../../models/types/level.type';

@Component({
  selector: 'app-level-list',
  templateUrl: './level-list.component.html',
  styleUrl: './level-list.component.scss'
})
export class LevelListComponent {
  list$: Observable<Level[]> = of(Array.from({ length: 20 }, (x, i) => { return { name: i + 1 } }));
  selectName: string = "level";
  selectLabel: string = "NIVEAU";
}