import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { TokenService } from '../services/connection/token.service';
import { LocalStorageService } from '../services/connection/local-storage.service';
import { ConnectionService } from '../services/connection/connection.service';


export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
) => {
  
  const tokenService = inject(TokenService);
  const localStorageService = inject(LocalStorageService);
  const connectionService = inject(ConnectionService);

    const router = inject(Router);
  
    const token = tokenService.getTokenFromLocalStorageAndDecode();
    if (token && !tokenService.isTokenEpired(token)) {
      return true;
    } else {
      localStorage.clear();
      connectionService.setUserConnected(null);
      router.navigateByUrl('visitor/home');
      return false;
    }
};
