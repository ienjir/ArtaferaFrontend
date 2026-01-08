import {isPlatformBrowser} from '@angular/common';
import {inject, PLATFORM_ID} from '@angular/core';
import {CanMatchFn, Router} from '@angular/router';
import {AuthService} from '@services/auth-service/auth-service';
import {map} from 'rxjs';

export const adminGuard: CanMatchFn = (route, segments) => {
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);
  const authService = inject(AuthService);
  const requestedUrl = `/${segments.map((segment) => segment.path).join('/')}`;

  if (!isPlatformBrowser(platformId)) {
    return router.createUrlTree(['/login'], {queryParams: {returnUrl: requestedUrl}});
  }

  if (!authService.hasValidAccessToken()) {
    return authService.restoreSession().pipe(
      map((restored) => {
        if (!restored) {
          return router.createUrlTree(['/login'], {queryParams: {returnUrl: requestedUrl}});
        }

        const role = authService.getRole();
        return role === 'admin' ? true : router.parseUrl('/');
      })
    );
  }

  const role = authService.getRole();
  return role === 'admin' ? true : router.parseUrl('/');
};
