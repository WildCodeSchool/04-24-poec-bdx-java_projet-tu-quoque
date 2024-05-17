import { Component, Input, OnInit } from '@angular/core';
import { SkillDetails } from '../../../../models/classes/skill-details.class';
import { Subject } from 'rxjs';
import { ListenPlayerActionService } from '../../../../shared/services/listen-player-action.service';
import { AbstractListenerComponent } from '../../../../shared/abstract-components/asbtract-listener-component.component';

@Component({
  selector: '[skill-row]',
  templateUrl: './skill-row.component.html',
  styleUrl: './skill-row.component.scss'
})
export class SkillRowComponent extends AbstractListenerComponent implements OnInit {
  @Input()
  skill!: SkillDetails;

  ranks!: number;
  complement!: string;
  playerInput$: Subject<SkillDetails> = new Subject();

  ngOnInit(): void {
    this.listener.receiveSkillFrom(this.playerInput$);
  }

  sendChanges() {
    this.skill.ranks = this.ranks;
    this.skill.complement = this.complement;
    this.playerInput$.next(this.skill);
  }
}
