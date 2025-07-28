import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login-service'

import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree => {
  const loginService = inject(LoginService);
  const router = inject(Router);

  if (loginService.isAuthenticated()) {
    return true;
  }

  // If not authenticated, redirect to the sign-in page
  return router.createUrlTree(['/sign-in']);
};
