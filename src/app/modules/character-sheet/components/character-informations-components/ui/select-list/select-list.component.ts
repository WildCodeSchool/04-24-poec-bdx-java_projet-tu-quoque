import { Component, Input, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Field } from '../../../../shared/models/types/field.type';
import { AbstractListenerComponent } from '../../../../shared/abstract-components/asbtract-listener-component.component';

@Component({
  selector: 'app-select-list',
  templateUrl: './select-list.component.html',
  styleUrl: './select-list.component.scss'
})
export class SelectListComponent extends AbstractListenerComponent implements OnInit {
  @Input()
  list$!: Observable<any>;
  @Input()
  selectName!: string;
  @Input()
  selectLabel!: string;

  playerChoice$: Subject<Field> = new Subject();

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
