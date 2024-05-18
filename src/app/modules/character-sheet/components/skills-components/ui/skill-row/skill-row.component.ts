import { Component, Input, OnInit } from '@angular/core';
import { SkillDetails } from '../../../../models/classes/skill-details.class';
import { Subject } from 'rxjs';
import { ListenPlayerActionService } from '../../../../shared/services/listen-player-action.service';
import { AbstractListenerComponent } from '../../../../shared/abstract-components/abstract-listener-component.component';
import { Field } from '../../../../shared/models/types/field.type';
import { SkillField } from '../../../../shared/models/types/skill-field.type';
import { AbstractSendToListenerComponent } from '../../../../shared/abstract-components/abstract-send-to-listener-component.component';

@Component({
  selector: '[skill-row]',
  templateUrl: './skill-row.component.html',
  styleUrl: './skill-row.component.scss'
})
export class SkillRowComponent extends AbstractSendToListenerComponent {
  @Input()
  skill!: SkillDetails;

  ranks!: number;
  complement!: string;

  override updateField(): Field {
    this.skill.ranks = this.ranks;
    this.skill.complement = this.complement;
    const field: SkillField = {
      index: this.skill.id,
      value: this.skill
    };
    return field;
  }
  // playerInput$: Subject<SkillDetails> = new Subject();

  // ngOnInit(): void {
  //   this.listener.receiveSkillField(this.playerInput$);
  // }

  // sendChanges() {
  //   this.skill.ranks = this.ranks;
  //   this.skill.complement = this.complement;
  //   const field: SkillField = {
  //     index: this.skill.id,
  //     value: this.skill
  //   };
  //   this.playerInput$.next(this.skill);
  // }
}
