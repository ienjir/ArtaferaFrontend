import {Injectable, signal, TemplateRef} from '@angular/core';
import {Toast} from "@interfaces/toast.model";

@Injectable({providedIn: 'root'})
export class ToastService {
  private readonly _toasts = signal<Toast[]>([]);
  readonly toasts = this._toasts.asReadonly();

  show(toast: Toast) {
    this._toasts.update((toasts) => [...toasts, toast]);
  }

  remove(toast: Toast) {
    this._toasts.update((toasts) => toasts.filter((t) => t !== toast));
  }

  clear() {
    this._toasts.set([]);
  }

  success(message: string, title: string = 'TL-Success') {
    this.show({
      message,
      title,
      type: 'success',
      classname: 'bg-success text-light',
      delay: 500000,
      autohide: true,
    })
  }

  error(message: string, title: string = 'Error') {
    this.show({
      message,
      title,
      type: 'error',
      classname: 'bg-danger text-light',
      delay: 7000,
      autohide: true
    });
  }

  warning(message: string, title: string = 'Warning') {
    this.show({
      message,
      title,
      type: 'warning',
      classname: 'bg-warning text-dark',
      delay: 7000,
      autohide: true
    });
  }

  info(message: string, title: string = 'Info') {
    this.show({
      message,
      title,
      type: 'info',
      classname: 'bg-info text-light',
      delay: 5000,
      autohide: true
    });
  }
}
