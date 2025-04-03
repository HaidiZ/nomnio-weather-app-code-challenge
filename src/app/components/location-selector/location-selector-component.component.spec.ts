import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { LocationSelectorComponent } from './location-selector-component.component';
import { Store, StoreModule } from '@ngrx/store';
import { LocationWeatherInfoComponent } from '../weather-information/location-weather-info.component';
import { setLoading, updateSelectedLocation } from 'src/app/store/actions/app.actions';
import { fetchWeather } from 'src/app/store/actions/weather.actions';

const mockLocationState = 'Ljubljana';
const mockLoadingState = false;

describe('LocationSelectorComponent', () => {
  let component: LocationSelectorComponent;
  let fixture: ComponentFixture<LocationSelectorComponent>;
  let store: Store;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LocationSelectorComponent, LocationWeatherInfoComponent ],
      imports: [
        IonicModule.forRoot(),
        StoreModule.forRoot({})
      ],
    }).compileComponents();

    store = TestBed.inject(Store);
    fixture = TestBed.createComponent(LocationSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should select a valid location and dispatch actions', () => {
    spyOn(store, 'dispatch');

    component.selectLocation('Ljubljana');
    
    expect(store.dispatch).toHaveBeenCalledWith(updateSelectedLocation({ location: 'Ljubljana' }));
    expect(store.dispatch).toHaveBeenCalledWith(setLoading({ loading: true }));
    expect(store.dispatch).toHaveBeenCalledWith(fetchWeather({ location: 'Ljubljana' }));
    expect(component.hasError).toBeFalse();
  });

  it('should handle an invalid location selection and set error state', () => {
    spyOn(store, 'dispatch');

    component.selectLocation('Invalid location');
    
    expect(component.hasError).toBeTrue();
    expect(store.dispatch).not.toHaveBeenCalledWith(fetchWeather({ location: 'Invalid location' }));
    expect(component.selectedLocation$).toBeTruthy();
  });

  it('should display error message when hasError is true', () => {
    component.hasError = true;
    fixture.detectChanges(); 

    const errorMessage = fixture.nativeElement.querySelector('.error-message');
    expect(errorMessage).toBeTruthy();
    expect(errorMessage.textContent).toContain('An error occured.');
  });
});
