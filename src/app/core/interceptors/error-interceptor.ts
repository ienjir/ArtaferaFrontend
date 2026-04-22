import { HttpInterceptorFn } from "@angular/common/http";
import { catchError, throwError } from "rxjs";
import { inject } from "@angular/core";
import { ErrorService } from "@services/error-service/error-service";
import {Router} from "@angular/router";
import {AuthService} from "@services/auth-service/auth-service";

export const ErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const errorService = inject(ErrorService);
  const router = inject(Router)
  const authService = inject(AuthService)

  return next(req).pipe(
    catchError((error) => {
      switch (error.status) {
        case 401:
          authService.logout()
          router.navigate(['/login'], {queryParams: {returnUrl: router.url}})
          break
      }
      errorService.handleHttpError(error)
      return throwError(() => error);
    })
  );
};
