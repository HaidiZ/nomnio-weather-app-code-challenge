import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonIcon } from '@ionic/angular/standalone';
import { LocationSelectorComponent } from 'src/app/components/location-selector/location-selector-component.component';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonIcon, LocationSelectorComponent],
})

export class HomePage {
  constructor() {}
}

