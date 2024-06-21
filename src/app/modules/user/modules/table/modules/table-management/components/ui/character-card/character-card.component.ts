import { Component, Input, inject } from '@angular/core';
import { Character } from '../../../../../../../../shared/models/types/users/character.type';
import { UserBasicInfos } from '../../../../../../../../shared/models/types/users/user-basic-infos.type';
import { CharacterAvatarDTO } from '../../../../../../../../shared/models/types/users/character-avatar-DTO';
import { CharacterService } from '../../../../../../../../shared/services/character/character.service';
import { userService } from '../../../../../../../../shared/services/users/user.service';

@Component({
  selector: 'app-character-card',
  templateUrl: './character-card.component.html',
  styleUrl: './character-card.component.scss',
})
export class CharacterCardComponent {
  private _characterService = inject(CharacterService);
  private _userService = inject(userService);

  @Input()
  character!: CharacterAvatarDTO;

  @Input()
  isUserCard: boolean = false;

  removeInvitation(elementId: number): void {
    if (!this.isUserCard) {
      this._characterService.deleteCaharacterInvited(elementId);
    } else {
      this._userService.deleteUserInvited(elementId)
    }
  }
}
