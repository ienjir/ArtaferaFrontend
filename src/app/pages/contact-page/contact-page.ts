import { Component } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {TranslocoPipe} from "@jsverse/transloco";

@Component({
  selector: 'ContactPage',
  imports: [
    TranslocoPipe,
    ReactiveFormsModule
  ],
  templateUrl: './contact-page.html',
  styleUrl: './contact-page.scss'
})
export class ContactPage {
  emailError = "";
  passwordError = "";

  contactForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    rememberMe: new FormControl(true)
  });


  submitLogin() {
    this.emailError = 'This feature is currently being implemented';
    this.passwordError = 'This feature is currently being implemented';
  }
}
