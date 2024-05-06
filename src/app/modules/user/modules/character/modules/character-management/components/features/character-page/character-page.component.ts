import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CharacterService } from '../../../../../../../../shared/services/character/character.service';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-character-page',
  templateUrl: './character-page.component.html',
  styleUrl: './character-page.component.scss',
})
export class CharacterPageComponent implements OnInit {
  
  character$!: Observable<any>;
  characterDiscussionList: any = [
    {
      id: 1,
      name: 'Discussion 1',
    },
    {
      id: 2,
      name: 'Discussion 2',
    },
    {
      id: 3,
      name: 'Discussion 3',
    },
    {
      id: 4,
      name: 'Discussion 4',
    },
  ];
  isCharacterSheetVisible: boolean = false;

  constructor(
    private _characterService: CharacterService,
    private _route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = Number(this._route.snapshot.paramMap.get('id'));
    this.character$ = this._characterService.getCharacterById(id);
  }

  toggleCharacterSheetVisible(event: boolean): void {
    this.isCharacterSheetVisible = !this.isCharacterSheetVisible
  }
}
