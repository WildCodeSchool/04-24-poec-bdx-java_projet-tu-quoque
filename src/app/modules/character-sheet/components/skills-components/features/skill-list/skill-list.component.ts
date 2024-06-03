import { Component, inject } from '@angular/core';
import { SkillsService } from '../../../../shared/services/skills.service';

@Component({
  selector: 'app-skill-list',
  templateUrl: './skill-list.component.html',
  styleUrl: './skill-list.component.scss'
})
export class SkillListComponent {
  protected characterSkills: SkillsService = inject(SkillsService);
}
