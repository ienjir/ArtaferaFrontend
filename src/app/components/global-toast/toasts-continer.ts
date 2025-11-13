import { Component, inject } from '@angular/core';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import {ToastService} from "@core/services/toast-service/toast-service";

@Component({
  selector: 'app-toasts',
  imports: [NgbToastModule],
  template: `
    @for (toast of toastService.toasts(); track toast) {
      <ngb-toast
        [class]="toast.classname"
        [autohide]="true"
        [delay]="toast.delay || 5000"
        (hidden)="toastService.remove(toast)"
      >
        <div class="d-flex justify-content-between align-items-center mb-2">
          @if (toast.title) {
            <strong>{{ toast.title }}</strong>
          }
          <button
            type="button"
            class="btn-close btn-close-white ms-2"
            style="min-height: unset;"
            aria-label="Close"
            (click)="toastService.remove(toast)"
          ></button>
        </div>
        <div>{{ toast.message }}</div>
      </ngb-toast>
    }
  `,
  host: { class: 'toast-container position-fixed top-0 end-0 p-3', style: 'z-index: 1200' },
})
export class ToastsContainer {
  readonly toastService = inject(ToastService);
}
