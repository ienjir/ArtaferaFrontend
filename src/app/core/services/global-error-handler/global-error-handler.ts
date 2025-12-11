import {ErrorHandler, inject, Injectable} from '@angular/core';
import {ErrorService} from "@services/error-service/error-service";

@Injectable({
  providedIn: 'root',
})
export class GlobalErrorHandler implements ErrorHandler {
  private errorService = inject(ErrorService)

  handleError(error: any): void {
    this.errorService.handleGlobalError(error)
  }
}
