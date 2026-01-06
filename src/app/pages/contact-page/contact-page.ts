import {Component, inject, signal} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {TranslocoPipe} from "@jsverse/transloco";
import {InputWrapper} from "@components/input-wrapper/input-wrapper";
import {NgOptimizedImage} from "@angular/common";
import {ContactService} from "@services/contact-service/contact-service";
import {ToastService} from "@services/toast-service/toast-service";
import {finalize} from "rxjs";

@Component({
  selector: 'ContactPage',
    imports: [
        TranslocoPipe,
        ReactiveFormsModule,
        InputWrapper,
        NgOptimizedImage
    ],
  templateUrl: './contact-page.html',
  styleUrl: './contact-page.scss'
})
export class ContactPage {
  private readonly contactService = inject(ContactService);
  private readonly toastService = inject(ToastService);

  emailError = "";
  messageError = "";
  readonly isSubmitting = signal(false);

  contactForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    message: new FormControl('', [Validators.required]),
  });

  submitContact() {
    this.emailError = '';
    this.messageError = '';
    this.contactForm.markAllAsTouched();

    const emailControl = this.contactForm.controls.email;
    const messageControl = this.contactForm.controls.message;

    if (emailControl.hasError('required')) {
      this.emailError = 'TL-CON_Email-Required';
    } else if (emailControl.hasError('email')) {
      this.emailError = 'TL-CON_Email-Invalid';
    }

    if (messageControl.hasError('required')) {
      this.messageError = 'TL-CON_Message-Required';
    }

    if (this.contactForm.invalid) {
      return;
    }

    const email = (emailControl.value ?? '').trim().toLowerCase();
    const message = (messageControl.value ?? '').trim();

    this.isSubmitting.set(true);
    this.contactService.sendMessage({email, message}).pipe(
      finalize(() => this.isSubmitting.set(false))
    ).subscribe({
      next: () => {
        this.contactForm.reset();
        this.toastService.success('TL-CON_Message-Sent');
      },
      error: () => {
        this.toastService.error('TL-CON_Message-Send-Failed');
      }
    });
  }
}
