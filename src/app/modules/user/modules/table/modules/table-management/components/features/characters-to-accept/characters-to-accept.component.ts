import { Component, OnInit } from '@angular/core';
import { CharacterService } from '../../../../../../../../shared/services/character/character.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Character } from '../../../../../../../../shared/models/types/users/character.type';

@Component({
  selector: 'app-characters-to-accept',
  templateUrl: './characters-to-accept.component.html',
  styleUrl: './characters-to-accept.component.scss'
})
export class CharactersToAcceptComponent implements OnInit {

  characterList$!: Observable<Character[]>

  constructor(
    private _characterService: CharacterService,
    private _route: ActivatedRoute
  ){}

  ngOnInit(): void {
      const id = Number(this._route.snapshot.paramMap.get('id'))
      this.characterList$ = this._characterService.getCharacterToAcceptByTable$(id)
      this._characterService.getCharacterToAcceptByTable$(id).subscribe(res => console.log(res))
    }

}
