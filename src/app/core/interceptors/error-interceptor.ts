import { HttpInterceptorFn } from "@angular/common/http";
import { catchError, throwError } from "rxjs";
import { inject } from "@angular/core";
import { ErrorService } from "@services/error-service/error-service";
import {Router} from "@angular/router";

export const ErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const errorService = inject(ErrorService);
  const router = inject(Router)

  return next(req).pipe(
    catchError((error) => {
      switch (error.status) {
        case 401:
          router.navigate(['/login'])
          break
      }
      errorService.handleHttpError(error)
      return throwError(() => error);
    })
  );
};
