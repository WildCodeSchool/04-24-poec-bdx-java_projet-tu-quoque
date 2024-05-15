import { Component, Input, OnInit } from '@angular/core';
import { SkillDetails } from '../../../../models/classes/skill-details.class';
import { Subject } from 'rxjs';
import { ListenPlayerActionService } from '../../../../shared/services/listen-player-action.service';

@Component({
  selector: '[skill-row]',
  templateUrl: './skill-row.component.html',
  styleUrl: './skill-row.component.scss'
})
export class SkillRowComponent implements OnInit {
  @Input()
  skill!: SkillDetails;

  ranks!: number;
  complement!: string;
  playerInput$: Subject<SkillDetails> = new Subject();

  constructor(private listener: ListenPlayerActionService) {

  }

  ngOnInit(): void {
    this.listener.receiveSkillFrom(this.playerInput$);
  }

  sendChanges() {
    this.skill.ranks = this.ranks;
    this.skill.complement = this.complement;
    this.playerInput$.next(this.skill);
  }
}
