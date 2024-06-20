import { Component, Input } from '@angular/core';
import { Character } from '../../../../../../../../shared/models/types/users/character.type';
import { UserBasicInfos } from '../../../../../../../../shared/models/types/users/user-basic-infos.type';
import { CharacterAvatarDTO } from '../../../../../../../../shared/models/types/users/character-avatar-DTO';

@Component({
  selector: 'app-character-card',
  templateUrl: './character-card.component.html',
  styleUrl: './character-card.component.scss',
})
export class CharacterCardComponent {
  
  @Input()
  character!: CharacterAvatarDTO;

  @Input()
  isUserCard: boolean = false;
}
