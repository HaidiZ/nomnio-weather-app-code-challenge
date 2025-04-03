import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectWeatherData, selectWeatherIconUrl } from '../../store/selectors/weather.selectors';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-weather-information',
  templateUrl: './location-weather-info.component.html',
  styleUrls: ['./location-weather-info.component.scss'],
  imports: [CommonModule]
})
export class LocationWeatherInfoComponent {
  weatherData$ = this.store.select(selectWeatherData);
  iconUrl$ = this.store.select(selectWeatherIconUrl);

  constructor(private store: Store) { }

}
