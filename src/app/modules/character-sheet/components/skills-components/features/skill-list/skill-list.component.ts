import { Component, OnInit } from '@angular/core';
import { SkillDetails } from '../../../../models/classes/skill-details.class';
import { CharacterSkills } from '../../../../models/classes/character-skills.class';
import { distinctUntilChanged, distinctUntilKeyChanged, Observable, Subject } from 'rxjs';
import { DbService } from '../../../../../shared/services/db-service/db.service';
import { CharacterSheetService } from '../../../../shared/services/character-sheet.service';
import { ListenPlayerActionService } from '../../../../shared/services/listen-player-action.service';

@Component({
  selector: 'app-skill-list',
  templateUrl: './skill-list.component.html',
  styleUrl: './skill-list.component.scss'
})
export class SkillListComponent implements OnInit {
  characterSkills!: CharacterSkills;
  //characterSkills$: Subject<CharacterSkills> = new Subject();

  constructor(
    private dbService: DbService,
    private sheetService: CharacterSheetService,
  ) {

  }

  ngOnInit(): void {
    this.characterSkills = new CharacterSkills(this.dbService, this.sheetService);
  }
}
