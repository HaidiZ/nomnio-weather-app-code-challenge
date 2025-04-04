import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { LocationWeatherInfoComponent } from './location-weather-info.component';
import { StoreModule, Store } from '@ngrx/store';
import { of } from 'rxjs';
import { selectWeatherData, selectWeatherIconUrl } from '../../store/selectors/weather.selectors';

const mockWeatherData = {
  name: 'Ljubljana',
  dt: 1634235200,
  weather: [{ main: 'Clear' }],
  main: { temp: 21, feels_like: 19 },
};

const mockIconUrl = '../../assets/icons/sun.svg';

describe('LocationWeatherInfoComponent', () => {
  let component: LocationWeatherInfoComponent;
  let fixture: ComponentFixture<LocationWeatherInfoComponent>;
  let store: Store;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [LocationWeatherInfoComponent],
      imports: [
        IonicModule.forRoot(),
        StoreModule.forRoot({})
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LocationWeatherInfoComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store);
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display weather data correctly when weatherData$ emits', () => {
    spyOn(store, 'select').and.callFake((selector) => {
      if (selector === selectWeatherData) {
        return of(mockWeatherData);
      }
      return of(null);
    });

    fixture.detectChanges();

    const city = fixture.nativeElement.querySelector('.weather-info-container__city');
    const temperature = fixture.nativeElement.querySelector('p:nth-of-type(4)');
    const feelsLike = fixture.nativeElement.querySelector('p:nth-of-type(5)');

    expect(city.textContent).toContain('Ljubljana');
    expect(temperature.textContent).toContain('Current temperature: 21 °C');
    expect(feelsLike.textContent).toContain('Feels like: 19°C');
  });

  it('should display weather icon when iconUrl$ emits', () => {
    spyOn(store, 'select').and.callFake((selector) => {
      if (selector === selectWeatherIconUrl) {
        return of(mockIconUrl);
      }
      return of(null);
    });

    fixture.detectChanges();

    const iconElement = fixture.nativeElement.querySelector('img');

    expect(iconElement).toBeTruthy();
    expect(iconElement.src).toBe(mockIconUrl);
  });
});
