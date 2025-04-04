import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { WeatherService } from '../../services/weather.service';
import { Store } from '@ngrx/store';
import { setLoading } from '../actions/app.actions';
import { fetchWeather, fetchWeatherSuccess, fetchWeatherFailure } from '../actions/weather.actions';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class WeatherEffects {

  loadWeather$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchWeather),
      mergeMap(({ location }) =>
        this.weatherService.getWeather(location).pipe(
          map((weatherData) => {
            this.store.dispatch(setLoading({ loading: false }));
            return fetchWeatherSuccess({ weatherData });
          }),
          catchError((error) => {
            this.store.dispatch(setLoading({ loading: false }));
            return of(fetchWeatherFailure({ error: error.message }));
          })
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private weatherService: WeatherService,
    private store: Store
  ) {}
}
