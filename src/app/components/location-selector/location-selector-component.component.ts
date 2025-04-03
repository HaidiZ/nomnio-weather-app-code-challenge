import { Component } from '@angular/core';
import { IonIcon, IonActionSheet } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { LocationWeatherInfoComponent } from '../weather-information/location-weather-info.component';
import { Store } from '@ngrx/store';
import { fetchWeather } from 'src/app/store/actions/weather.actions';
import { selectLoadingState, selectLocation } from 'src/app/store/selectors/app.selectors';
import { setLoading, updateSelectedLocation } from 'src/app/store/actions/app.actions';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-location-selector',
  templateUrl: './location-selector-component.component.html',
  styleUrls: ['./location-selector-component.component.scss'],
  imports: [IonIcon, IonActionSheet, CommonModule, LocationWeatherInfoComponent],
})
export class LocationSelectorComponent {
  selectedLocation$: Observable<string>;
  loadingState$ = this.store.select(selectLoadingState);
  hasError = false; 

  constructor(private store: Store) {
    this.selectedLocation$ = this.store.select(selectLocation);
  }

  public locationButtons = [
    {
      text: 'Current Location',
      handler: () => {
        this.selectLocation('Current Location');
      },
    },
    {
      text: 'Ljubljana',
      handler: () => {
        this.selectLocation('Ljubljana');
      },
    },
    {
      text: 'Maribor',
      handler: () => {
        this.selectLocation('Maribor');
      },
    },
    {
      text: 'Celje',
      handler: () => {
        this.selectLocation('Celje');
      },
    },
    {
      text: 'Invalid location',
      handler: () => {
        this.hasError = true;
        this.selectLocation('Invalid location');
      },
    },
    {
      text: 'Cancel',
      role: 'cancel',
    },
  ];

  selectLocation(location: string) {
    if (location === 'Invalid location') {
      this.hasError = true;
    } else {
      this.hasError = false;
      this.store.dispatch(updateSelectedLocation({ location }));
      this.store.dispatch(setLoading({ loading: true }));
      this.store.dispatch(fetchWeather({ location }));
    }
  }
}