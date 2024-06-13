import { ActivatedRouteSnapshot, CanActivateFn, Router } from '@angular/router';
import { UserInfos } from '../models/types/users/user-infos';
import { CharacterDTO } from '../models/types/users/character-dto';
import { DestroyRef, inject } from '@angular/core';
import { ConnectionService } from '../services/connection/connection.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { map, Observable } from 'rxjs';

export const sheetGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state): Observable<boolean> => {

  const router = inject(Router);
  const service = inject(ConnectionService);
  const destroyRef = inject(DestroyRef);
  let id: number = route.params['id'];

  return service.personalInfo().pipe(
    takeUntilDestroyed(destroyRef),
    map((user: UserInfos | null) => {

      if (user) return isCharacterInUserCharacters(user, id);
      router.navigateByUrl('visitor/home');
      return false;
    })
  )
};

function isCharacterInUserCharacters(user: UserInfos, id: number) {

  const characterIdList: number[] = user.playerCharacterList.map((character: CharacterDTO) => character.id);

  if (characterIdList.includes(Number(id))) {
    return true;
  }
  return false;
}