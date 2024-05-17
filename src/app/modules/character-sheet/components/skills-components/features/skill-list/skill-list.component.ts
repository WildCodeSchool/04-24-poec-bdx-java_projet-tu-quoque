import { Component } from '@angular/core';
import { SkillsService } from '../../../../shared/services/skills.service';

@Component({
  selector: 'app-skill-list',
  templateUrl: './skill-list.component.html',
  styleUrl: './skill-list.component.scss'
})
export class SkillListComponent {
  constructor(
    protected characterSkills: SkillsService
  ) {
  }
}
