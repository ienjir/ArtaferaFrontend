import { HttpInterceptorFn } from "@angular/common/http";
import { catchError, throwError } from "rxjs";
import { inject } from "@angular/core";
import { ErrorService } from "@services/error-service/error-service";

export const ErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const errorService = inject(ErrorService);

  return next(req).pipe(
    catchError((error) => {
      errorService.handleHttpError(error);
      return throwError(() => error);
    })
  );
};
