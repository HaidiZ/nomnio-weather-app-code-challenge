import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class LocationService {

    constructor() { }

    getCurrentLocation(): Observable<any> {
        return new Observable(observer => {
            // Commenting out the actual geolocation code
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

            // 🔥 Hardcoded coordinates for Ptuj, Slovenia
            const fallbackLat = 46.4199;
            const fallbackLng = 15.8705;
            observer.next({ latitude: fallbackLat, longitude: fallbackLng });
            observer.complete();
        });
    }


}
