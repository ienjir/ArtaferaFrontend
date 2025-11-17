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
      case 0:
        return "TL-ERR_Server-Error"
      case 400:
        return 'TL-ERR_Bad-Request'
      case 401:
        return 'TL-ERR_Unauthorized'
      case 403:
        return 'TL-ERR_Forbidden'
      case 404:
        return 'TL-ERR_Not-Found'
      case 500:
        return 'TL-ERR_Internal-Server-Error'
      default:
        return 'TL-ERR_Unexpected-Error'
    }
  }

  handleHttpError(error: HttpErrorResponse) {
    const title = this.translocoService.translate(this.getHttpMessage(error))
    const msg = this.translocoService.translate("TL_Something-Went-Wrong")
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
