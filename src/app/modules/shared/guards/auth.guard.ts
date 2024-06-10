import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot } from '@angular/router';
import { TokenService } from '../services/connection/token.service';
import { Router } from 'react-router-dom';
import { of } from 'rxjs';

export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
) => {
  console.log("toto");
  
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
