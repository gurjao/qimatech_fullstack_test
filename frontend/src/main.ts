import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { importProvidersFrom } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { appConfig } from './app/app.config';
import { providePrimeNG } from 'primeng/config';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import Lara from '@primeng/themes/lara';

bootstrapApplication(AppComponent, {
  providers: [
    ...appConfig.providers,
    importProvidersFrom(BrowserAnimationsModule),
    provideAnimationsAsync(),
    providePrimeNG({
        ripple: true,
        theme: {
            preset: Lara
        }
    }),
  ],
}).catch(err => console.error(err));
