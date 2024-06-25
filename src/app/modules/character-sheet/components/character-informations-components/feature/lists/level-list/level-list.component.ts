import { Component } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { Level } from '../../../../../models/types/level.type';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AbstractListenerComponent } from '../../../../../shared/abstract-components/abstract-listener-component.component';
import { Sheet } from '../../../../../models/types/sheet.type';

@Component({
  selector: 'app-level-list',
  templateUrl: './level-list.component.html',
  styleUrl: './level-list.component.scss'
})
export class LevelListComponent extends AbstractListenerComponent {
  list$: Observable<Level[]> = of(Array.from({ length: 20 }, (x, i) => { return { name: i + 1 } }));
  selectName: string = "level";
  selectLabel: string = "NIVEAU";
  actual$: Observable<string> = this.listener.sendInfos().pipe(
    map((sheet: Sheet) => sheet.level)
  );

  ngOnInit() {
    this.listener.sendInfos().pipe(
      map((sheet: Sheet) => sheet.level)
    );
  }
}
