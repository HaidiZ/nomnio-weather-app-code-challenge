import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { IonIcon, IonActionSheet } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { LocationWeatherInfoComponent } from '../weather-information/location-weather-info.component';
import { Store } from '@ngrx/store';
import { Observable, Subscription, combineLatest, startWith, switchMap } from 'rxjs';
import { TranslateModule, TranslateService, LangChangeEvent } from '@ngx-translate/core';

import { AppState } from 'src/app/store/reducers/app.reducer';
import { fetchWeather } from 'src/app/store/actions/weather.actions';
import { fetchCurrentLocation } from 'src/app/store/actions/location.actions';
import { setLoading, updateSelectedLocation } from 'src/app/store/actions/app.actions';
import { selectLoadingState, selectLocation } from 'src/app/store/selectors/app.selectors';
import { selectWeatherData, selectWeatherError } from '../../store/selectors/weather.selectors';

@Component({
  selector: 'app-location-selector',
  templateUrl: './location-selector-component.component.html',
  styleUrls: ['./location-selector-component.component.scss'],
  standalone: true,
  imports: [
    IonIcon,
    IonActionSheet,
    CommonModule,
    LocationWeatherInfoComponent,
    TranslateModule,
  ],
})
export class LocationSelectorComponent implements OnInit, OnDestroy {
  selectedLocation$: Observable<string>;
  translatedLocation$: Observable<string> | undefined;
  weatherError$ = this.store.select(selectWeatherError);
  loadingState$ = this.store.select(selectLoadingState);

  isDescShown: boolean = true;
  hasError: boolean = false;
  locationButtons: any[] = [];
  private langChangeSub?: Subscription;

  constructor(
    private store: Store<AppState>,
    private translateService: TranslateService,
    private cdRef: ChangeDetectorRef
  ) {
    this.selectedLocation$ = this.store.select(selectLocation);

    const langChange$ = this.translateService.onLangChange.pipe(startWith(null));

    this.translatedLocation$ = combineLatest([this.selectedLocation$, langChange$]).pipe(
      switchMap(([key]) => this.translateService.get(key))
    );
  }

  ngOnInit(): void {
    this.updateButtons();

    this.langChangeSub = this.translateService.onLangChange.subscribe(
      (_event: LangChangeEvent) => this.updateButtons()
    );

    this.weatherError$.subscribe((error) => {
      this.hasError = !!error;
      this.cdRef.markForCheck();
    });
  }

  updateButtons(): void {
    this.translateService
      .get(['CURRENT_LOCATION', 'INVALID_LOCATION', 'CANCEL'])
      .subscribe((translations) => {
        const currentLocationText = translations['CURRENT_LOCATION'] || 'Current Location';
        const invalidLocationText = translations['INVALID_LOCATION'] || 'Invalid location';
        const cancelText = translations['CANCEL'] || 'Cancel';

        this.locationButtons = [
          {
            text: currentLocationText,
            handler: () => this.selectLocation('Current Location'),
          },
          {
            text: 'Ljubljana',
            handler: () => this.selectLocation('Ljubljana'),
          },
          {
            text: 'Maribor',
            handler: () => this.selectLocation('Maribor'),
          },
          {
            text: 'Celje',
            handler: () => this.selectLocation('Celje'),
          },
          {
            text: invalidLocationText,
            handler: () => {
              this.hasError = true;
              this.selectLocation('Invalid location');
            },
          },
          {
            text: cancelText,
            role: 'cancel',
          },
        ];

        this.cdRef.markForCheck();
      });
  }

  selectLocation(location: string): void {
    this.store.dispatch(setLoading({ loading: true }));

    if (location === 'Invalid Location') {
      this.hasError = true;
    } else if (location === 'Current Location') {
      this.hasError = false;
      this.store.dispatch(fetchCurrentLocation());
    } else {
      this.hasError = false;
      this.isDescShown = false;
      this.store.dispatch(fetchWeather({ location }));
      this.store.dispatch(updateSelectedLocation({ location }));
    }
  }

  ngOnDestroy(): void {
    this.langChangeSub?.unsubscribe();
  }
}