import {Component, inject, signal} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router, ActivatedRoute} from '@angular/router';
import {TranslocoPipe} from '@jsverse/transloco';
import {InputWrapper} from '@components/input-wrapper/input-wrapper';
import {AuthService} from '@services/auth-service/auth-service';
import {ToastService} from '@services/toast-service/toast-service';
import {finalize} from 'rxjs';

@Component({
  selector: 'app-login-page',
  imports: [
    ReactiveFormsModule,
    TranslocoPipe,
    InputWrapper
  ],
  templateUrl: './login-page.html',
  styleUrl: './login-page.scss'
})
export class LoginPage {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly toastService = inject(ToastService);

  readonly isSubmitting = signal(false);
  emailError = '';
  passwordError = '';

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });

  submitLogin() {
    this.emailError = '';
    this.passwordError = '';
    this.loginForm.markAllAsTouched();

    const emailControl = this.loginForm.controls.email;
    const passwordControl = this.loginForm.controls.password;

    if (emailControl.hasError('required')) {
      this.emailError = 'emailRequired';
    } else if (emailControl.hasError('email')) {
      this.emailError = 'emailFormat';
    }

    if (passwordControl.hasError('required')) {
      this.passwordError = 'passwordRequired';
    }

    if (this.loginForm.invalid) {
      return;
    }

    const email = (emailControl.value ?? '').trim().toLowerCase();
    const password = (passwordControl.value ?? '').trim();

    this.isSubmitting.set(true);
    this.authService.login(email, password).pipe(
      finalize(() => this.isSubmitting.set(false))
    ).subscribe({
      next: () => {
        const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') ?? '/';
        this.router.navigateByUrl(returnUrl);
      },
      error: () => {
        this.toastService.error('unknownError');
      }
    });
  }
}
