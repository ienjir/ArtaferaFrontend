import {inject, Injectable} from '@angular/core';
import {ToastService} from "@services/toast-service/toast-service";
import {TranslocoService} from "@jsverse/transloco";
import {HttpErrorResponse} from "@angular/common/http";

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  private toastService = inject(ToastService)
  private translocoService = inject(TranslocoService)

  private getHttpMessage(error: HttpErrorResponse): string {
    switch (error.status) {
      case 400:
        return 'TL_Bad-request'
      case 401:
        return 'TL_Unauthorized'
      case 403:
        return 'TL_Forbidden'
      case 404:
        return 'TL_Not-Found'
      case 500:
        return 'TL_Internal-Server-Error'
      default:
        return 'TL_Unexpected-Error'
    }
  }

  handleHttpError(error: HttpErrorResponse) {
    const msg = this.translocoService.translate(this.getHttpMessage(error))
    const title = this.translocoService.translate("TL_Something-Went-Wrong")
    this.toastService.error(msg, title)
    this.processError(error)
  }

  handleGlobalError(error: any): void {
    const title = this.translocoService.translate("TL_Something-Went-Wrong")
    this.toastService.error(error, title)
    this.processError(error)
  }

  processError(error: any) {
    console.error(error)
  }
}
