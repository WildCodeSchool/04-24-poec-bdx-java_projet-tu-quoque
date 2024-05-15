import { Component, Input } from '@angular/core';
import { SkillDetails } from '../../../../models/classes/skill-details.class';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.scss'
})
export class SkillsComponent {
  @Input()
  skills$!: Observable<SkillDetails[]>;
}
