import { createSelector, createFeatureSelector } from '@ngrx/store';
import { WeatherState } from '../reducers/weather.reducer';

export const selectWeatherState = createFeatureSelector<WeatherState>('weather');

export const selectWeatherData = createSelector(
  selectWeatherState,
  (state) => state.weatherData
);

export const selectWeatherIconUrl = createSelector(
  selectWeatherState,
  (state) => state.iconUrl
);

export const selectWeatherLoading = createSelector(
  selectWeatherState,
  (state) => state.loading
);

export const selectWeatherError = createSelector(
  selectWeatherState,
  (state) => state.error
);
