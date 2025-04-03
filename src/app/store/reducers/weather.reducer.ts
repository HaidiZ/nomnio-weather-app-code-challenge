import { createReducer, on } from '@ngrx/store';
import * as WeatherActions from '../actions/weather.actions';

export interface WeatherState {
  weatherData: any | null;
  iconUrl: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: WeatherState = {
  weatherData: null,
  iconUrl: null,
  loading: false,
  error: null
};

export const weatherReducer = createReducer(
  initialState,
  on(WeatherActions.fetchWeather, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(WeatherActions.fetchWeatherSuccess, (state, { weatherData }) => {
    const iconUrl = `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`;
    return {
      ...state,
      loading: false,
      weatherData,
      iconUrl
    };
  }),
  on(WeatherActions.fetchWeatherFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  }))
);
