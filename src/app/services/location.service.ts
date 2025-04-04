import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class LocationService {

    constructor() { }

    getCurrentLocation(): Observable<any> {
        return new Observable(observer => {
            // Geocolation je blokiran za localhost, zato sem hardcodala,
            // sem pa pustila kodo, da je viden moj pristop. :)
            /*
            if (navigator.geolocation) {
              navigator.geolocation.getCurrentPosition(
                (position) => {
                  const { latitude, longitude } = position.coords;  
                  observer.next({ latitude, longitude });
                  observer.complete();
                },
                (error) => {
                  console.error('Error getting location:', error);
                  observer.error(error);
                }
              );
            } else {
              observer.error('Geolocation is not supported by this browser.');
            }
            */
            const fallbackLat = 46.4199;
            const fallbackLng = 15.8705;
            observer.next({ latitude: fallbackLat, longitude: fallbackLng });
            observer.complete();
        });
    }


}
