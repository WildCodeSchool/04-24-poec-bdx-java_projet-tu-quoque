import { Component, Input, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ListenPlayerActionService } from '../../../shared/services/listen-player-action.service';
import { Field } from '../../../shared/models/types/field.type';

@Component({
  selector: 'app-select-list',
  templateUrl: './select-list.component.html',
  styleUrl: './select-list.component.scss'
})
export class SelectListComponent implements OnInit {
  @Input()
  list$!: Observable<any>;
  @Input()
  selectName!: string;
  @Input()
  selectLabel!: string;

  playerChoice$: Subject<Field> = new Subject();

  constructor(private listener: ListenPlayerActionService) {

  }

  ngOnInit(): void {
    this.listener.receiveInfoFrom(this.playerChoice$);
  }

  sendChanges(value: string) {
    const field: Field = {
      name: this.selectName,
      value: value
    }
    this.playerChoice$.next(field);
  }

}
