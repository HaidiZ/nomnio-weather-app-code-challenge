import { createAction, props } from '@ngrx/store';

export const fetchWeather = createAction('[Weather] Fetch Weather', props<{ location: string }>());
export const fetchWeatherSuccess = createAction('[Weather] Load Fetch Success', props<{ weatherData: any }>());
export const fetchWeatherFailure = createAction('[Weather] Load Fetch Failure', props<{ error: string }>());