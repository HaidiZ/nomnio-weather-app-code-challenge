import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { IonIcon, IonActionSheet } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { LocationWeatherInfoComponent } from '../weather-information/location-weather-info.component';
import { Store } from '@ngrx/store';
import { fetchWeather } from 'src/app/store/actions/weather.actions';
import { selectLoadingState, selectLocation } from 'src/app/store/selectors/app.selectors';
import { setLoading, updateSelectedLocation } from 'src/app/store/actions/app.actions';
import { Observable, Subscription, combineLatest, startWith, switchMap } from 'rxjs';
import { TranslateModule, TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { selectWeatherData, selectWeatherError } from '../../store/selectors/weather.selectors';
import { fetchCurrentLocation } from 'src/app/store/actions/location.actions';

@Component({
  selector: 'app-location-selector',
  templateUrl: './location-selector-component.component.html',
  styleUrls: ['./location-selector-component.component.scss'],
  imports: [IonIcon, IonActionSheet, CommonModule, LocationWeatherInfoComponent, TranslateModule],
})
export class LocationSelectorComponent implements OnInit, OnDestroy {
  selectedLocation$: Observable<string>;
  translatedLocation$: Observable<string> | undefined;
  weatherError$ = this.store.select(selectWeatherError);
  loadingState$ = this.store.select(selectLoadingState);
  isDescShown: boolean = true;
  hasError = false;
  locationButtons: any[] = [];
  private langChangeSub?: Subscription;

  constructor(
    private store: Store,
    private translateService: TranslateService,
    private cdRef: ChangeDetectorRef
  ) {

    this.selectedLocation$ = this.store.select(selectLocation);
    const langChange$ = this.translateService.onLangChange.pipe(startWith(null));

    this.translatedLocation$ = combineLatest([this.selectedLocation$, langChange$]).pipe(
      switchMap(([key]) => this.translateService.get(key))
    );
  }

  ngOnInit() {
    this.updateButtons();

    this.langChangeSub = this.translateService.onLangChange.subscribe(
      (event: LangChangeEvent) => {
        this.updateButtons();
      }
    );

    this.weatherError$.subscribe((error) => {
      this.hasError = !!error;
      this.cdRef.markForCheck();
    });
  }

  updateButtons() {
    this.translateService.get(['CURRENT_LOCATION', 'INVALID_LOCATION', 'CANCEL']).subscribe(translations => {
      const currentLocationText = translations['CURRENT_LOCATION'] || 'Current Location';
      const invalidLocationText = translations['INVALID_LOCATION'] || 'Invalid location';
      const cancelText = translations['CANCEL'] || 'Cancel';

      this.locationButtons = [
        { text: currentLocationText, handler: () => this.selectLocation('Current Location') },
        { text: 'Ljubljana', handler: () => this.selectLocation('Ljubljana') },
        { text: 'Maribor', handler: () => this.selectLocation('Maribor') },
        { text: 'Celje', handler: () => this.selectLocation('Celje') },
        { text: invalidLocationText, handler: () => { this.hasError = true; this.selectLocation('Invalid location'); }},
        { text: cancelText, role: 'cancel' },
      ];

      this.cdRef.markForCheck();
    });
  }

  selectLocation(location: string) {
    this.store.dispatch(setLoading({ loading: true }));
  
    if (location === 'Invalid Location') {
      this.hasError = true;
    } else if (location === 'Current Location'){
      this.hasError = false;
      this.store.dispatch(fetchCurrentLocation()); 
    } else {
      this.hasError = false;
      this.isDescShown = false;
      this.store.dispatch(fetchWeather({ location }));
      this.store.dispatch(updateSelectedLocation({ location }));
    }
  }  

  ngOnDestroy() {
    this.langChangeSub?.unsubscribe();
  }
}