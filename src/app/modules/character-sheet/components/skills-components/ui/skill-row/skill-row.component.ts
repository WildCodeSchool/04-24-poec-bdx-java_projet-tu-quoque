import { Component, Input } from '@angular/core';
import { SkillDetails } from '../../../../models/classes/skill-details.class';
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
}
