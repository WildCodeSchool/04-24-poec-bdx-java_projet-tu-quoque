import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ListenPlayerActionService } from '../../shared/services/listen-player-action.service';
import { Observable, Subject } from 'rxjs';
import { UserInfos } from '../../../shared/models/types/users/user-infos';
import { CharacterDTO } from '../../../shared/models/types/users/character-dto';
import { ConnectionSheetService } from '../../shared/services/connection-sheet.service';

@Component({
  selector: 'app-sheet-page',
  templateUrl: './sheet-page.component.html',
  styleUrl: './sheet-page.component.scss'
})
export class SheetPageComponent {
  private route = inject(ActivatedRoute);
  id!: number;
  id$: Subject<number> = new Subject();

  listener: ListenPlayerActionService = inject(ListenPlayerActionService);

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.listener.setId(this.id$.asObservable());
    this.id$.next(this.id);
  }

}
