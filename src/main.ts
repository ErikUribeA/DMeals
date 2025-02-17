import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import rootConfig from './app/app.routes';
import { importProvidersFrom } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(rootConfig),
    importProvidersFrom(FontAwesomeModule) // 💡 Aquí importamos FontAwesomeModule
  ]
})
  .catch((err) => console.error(err));
