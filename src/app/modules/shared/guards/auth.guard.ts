import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { TokenService } from '../services/connection/token.service';


export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
) => {
  
  const tokenService = inject(TokenService);
    const router = inject(Router);
  
    const token = tokenService.getTokenFromLocalStorageAndDecode();
    if (token) {
      return true;
    } else {
      router.navigateByUrl('visitor/home');
      return false;
    }
};
