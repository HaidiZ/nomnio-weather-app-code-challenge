import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectWeatherData, selectWeatherIconUrl } from '../../store/selectors/weather.selectors';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-weather-information',
  templateUrl: './location-weather-info.component.html',
  styleUrls: ['./location-weather-info.component.scss'],
  imports: [CommonModule, TranslateModule]
})
export class LocationWeatherInfoComponent {
  weatherData$ = this.store.select(selectWeatherData);
  iconUrl$ = this.store.select(selectWeatherIconUrl);

  constructor(
    private store: Store,
    private translateService: TranslateService
  ) {
    this.translateService.setDefaultLang('en');
    this.translateService.use('en');
  }
}