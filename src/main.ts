/// <reference types="@angular/localize" />

import {bootstrapApplication} from '@angular/platform-browser';
import {appConfig} from './app/app.config';
import {App} from './app/app';

bootstrapApplication(App, appConfig)
  .then(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-bs-theme', 'dark');
    }
  })
  .catch((err) => console.error(err));
