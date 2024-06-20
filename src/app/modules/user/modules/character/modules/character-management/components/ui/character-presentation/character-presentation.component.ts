import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Character } from '../../../../../../../../shared/models/types/users/character.type';
import { CharacterFullDTO } from '../../../../../../../../shared/models/types/users/character-full-dto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-character-presentation',
  templateUrl: './character-presentation.component.html',
  styleUrl: './character-presentation.component.scss',
})
export class CharacterPresentationComponent {
  
  @Input()
  character!: CharacterFullDTO;

  @Output()
  isCharachterSheetVisible: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(
    private _router: Router,
  ) { }

  showCharacterSheet(): void {
    this.isCharachterSheetVisible.emit();
  }

  linkToCharacterTable(id: number): void {
    this._router.navigateByUrl(`user/tables/management/my-tables/${id}`)
  }
}
