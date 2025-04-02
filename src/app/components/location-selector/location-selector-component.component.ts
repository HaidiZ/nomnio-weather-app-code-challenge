import { Component, OnInit } from '@angular/core';
import { IonIcon } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { LocationWeatherInfoComponent } from '../location-weather-info/location-weather-info.component';

@Component({
  selector: 'app-location-selector',
  templateUrl: './location-selector-component.component.html',
  styleUrls: ['./location-selector-component.component.scss'],
  imports: [IonIcon, CommonModule, LocationWeatherInfoComponent]
})
export class LocationSelectorComponent {
  isLocationSelectorVisible: boolean = false;

  selectedLocation: string = 'Select location';

  selectLocation(location: string) {
    this.selectedLocation = location;
    this.isLocationSelectorVisible = false;
  }

  toggleSelector(): void {
    this.isLocationSelectorVisible = !this.isLocationSelectorVisible;
  }
}
