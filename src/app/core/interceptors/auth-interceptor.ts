import {HttpInterceptorFn} from '@angular/common/http';
import {inject} from '@angular/core';
import {AuthService} from '@services/auth-service/auth-service';

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);

  if (req.url.includes('/auth/login') || req.url.includes('/auth/refresh')) {
    return next(req);
  }

  const accessToken = authService.getAccessToken();
  if (!accessToken) {
    return next(req);
  }

  const authRequest = req.clone({
    setHeaders: {
      Authorization: `Bearer ${accessToken}`
    }
  });

  return next(authRequest);
};
