import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons'; 
import { chevronDown, chevronForward } from 'ionicons/icons';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { provideStore } from '@ngrx/store';
import { appReducer } from './app/store/reducers/app.reducer';
import { provideEffects } from '@ngrx/effects';
import { WeatherEffects } from './app/store/effects/weather.effects';
import { HttpClientModule } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { weatherReducer } from './app/store/reducers/weather.reducer';

addIcons({
  chevronDown, chevronForward
});

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
    provideStore({ app: appReducer, weather: weatherReducer }),
    provideEffects([WeatherEffects]),
    importProvidersFrom(HttpClientModule)
  ],
});
