import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { WeatherService } from '../../services/weather.service';
import { fetchCurrentLocation, setLocation } from '../actions/location.actions';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { fetchWeather } from '../actions/weather.actions';
import { LocationService } from 'src/app/services/location.service';

@Injectable()
export class LocationEffects {

  constructor(
    private actions$: Actions,
    private weatherService: WeatherService,
    private locationService: LocationService
  ) {}

  fetchCurrentLocation$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchCurrentLocation),
      switchMap(() =>
        this.locationService.getCurrentLocation().pipe(
          map(({ latitude, longitude }) => {
            return setLocation({ latitude, longitude });
          }),
          catchError((error) => {
            console.error('Error fetching location:', error);
            return of(setLocation({ latitude: null, longitude: null }));
          })
        )
      )
    )
  );

  fetchWeatherForCurrentLocation$ = createEffect(() =>
    this.actions$.pipe(
      ofType(setLocation),
      switchMap(({ latitude, longitude }) => {
        if (latitude && longitude) {
          return this.weatherService.getWeatherByCoordinates(latitude, longitude).pipe(
            map((weatherData) => {
              return fetchWeather({ location: weatherData.name });
            }),
            catchError((error) => {
              console.error('Error fetching weather:', error);
              return of(fetchWeather({ location: 'Error' }));
            })
          );
        } else {
          return of(fetchWeather({ location: 'Error' }));
        }
      })
    )
  );
}
