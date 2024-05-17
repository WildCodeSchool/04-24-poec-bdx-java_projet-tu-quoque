import { Component, OnInit } from '@angular/core';
import { DbService } from '../../../../../shared/services/db-service/db.service';
import { CharacterSheetService } from '../../../../shared/services/character-sheet.service';
import { SkillsService } from '../../../../shared/services/skills.service';

@Component({
  selector: 'app-skill-list',
  templateUrl: './skill-list.component.html',
  styleUrl: './skill-list.component.scss'
})
export class SkillListComponent implements OnInit {
  characterSkills!: SkillsService;

  constructor(
    private dbService: DbService,
    private sheetService: CharacterSheetService,
  ) {
  }

  ngOnInit(): void {
    this.characterSkills = new SkillsService(this.dbService, this.sheetService);
  }
}
