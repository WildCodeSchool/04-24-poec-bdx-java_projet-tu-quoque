import { Component, HostListener, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ListenPlayerActionService } from '../../shared/services/listen-player-action.service';
import { Subject } from 'rxjs';
import { ConnectionSheetService } from '../../shared/services/connection-sheet.service';

@Component({
  selector: 'app-sheet-page',
  templateUrl: './sheet-page.component.html',
  styleUrl: './sheet-page.component.scss'
})
export class SheetPageComponent implements OnInit, OnDestroy {
  @HostListener('window:unload', ['$event'])
  unloadHandler(event: any) {
    this.isAlive ? this.taskBeforeDestroyComponent() : "";
  }

  @HostListener('window:beforeunload', ['$event'])
  beforeUnloadHandler(event: any) {
    this.isAlive ? this.taskBeforeDestroyComponent() : "";
  }

  private route = inject(ActivatedRoute);
  id!: number;
  id$: Subject<number> = new Subject();
  isAlive: boolean = true;
  listener: ListenPlayerActionService = inject(ListenPlayerActionService);
  connectionService: ConnectionSheetService = inject(ConnectionSheetService);


  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.listener.setId(this.id$.asObservable());
    this.id$.next(this.id);
  }

  @HostListener('unloaded')
  ngOnDestroy(): void {
    this.isAlive ? this.taskBeforeDestroyComponent() : "";
  }

  taskBeforeDestroyComponent() {
    this.isAlive = false;
    // save the sheet
    this.connectionService.postSheet(this.listener.sheetModifiedByPlayer);
    console.log("plop");
  }

  save() {
    this.connectionService.postSheet(this.listener.sheetModifiedByPlayer);
  }
}
