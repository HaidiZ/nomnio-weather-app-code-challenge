import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private API_KEY = '1b94df0ce07291e14d52f44a6761b5de';

  constructor(private http: HttpClient) {}

  getWeather(location: string): Observable<any> {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${this.API_KEY}&units=metric`;
    return this.http.get(url);
  }

  getIcon(iconCode: string): Observable<any> {
    const url =`http://openweathermap.org/img/wn/' + ${iconCode} + '@1x.png`;
    return this.http.get(url);
  }
}
