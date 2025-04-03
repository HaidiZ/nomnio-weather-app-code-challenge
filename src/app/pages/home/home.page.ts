import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { LocationSelectorComponent } from 'src/app/components/location-selector/location-selector-component.component';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  imports: [IonicModule, LocationSelectorComponent]
})
export class HomePage implements OnInit {

  constructor() {}

  ngOnInit() {}
}