import {ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection, isDevMode} from '@angular/core';
import {provideRouter, withInMemoryScrolling} from '@angular/router';

import {routes} from './app.routes';
import {provideClientHydration, withEventReplay} from '@angular/platform-browser';
import {provideHttpClient, withFetch} from '@angular/common/http';
import {TranslocoHttpLoader} from './transloco-loader';
import {provideTransloco} from '@jsverse/transloco';
import {provideNgxSkeletonLoader} from "ngx-skeleton-loader";

export const appConfig: ApplicationConfig = {
  providers: [
    provideNgxSkeletonLoader({
      theme: {
        extendsFromRoot: true,
        height: '1.5rem',
      },
    }),
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideClientHydration(withEventReplay()),
    provideHttpClient(withFetch()),
    provideRouter(
      routes,
      withInMemoryScrolling({
        scrollPositionRestoration: "top",
        anchorScrolling: 'enabled'
      }),
    ),
    provideTransloco({
      config: {
        availableLangs: ['de', 'en'],
        defaultLang: 'de',
        reRenderOnLangChange: true,
        prodMode: !isDevMode(),
      },
      loader: TranslocoHttpLoader
    })
  ]
};
