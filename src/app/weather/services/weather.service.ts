import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Forecast } from '../../models/forecast.model';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  baseApiUrl = environment.baseApiUrl;
  apiKey = environment.apiKey;

  constructor(private http: HttpClient) {}

  getWeather(data: string): Observable<Forecast> {
    const props = this.getProperties(data);
    const httpParams = new HttpParams({
      fromObject: {
        q: `${props[0]}`,
        unit: `${props[1]}`,
        appid: this.apiKey,
      },
    });
    const options = {
      headers: new HttpHeaders(),
      params: httpParams,
    };

    return this.http.get<Forecast>(this.baseApiUrl, options);
  }

  private getProperties(data: string): string[] {
    const props = [];
    const separatorIndex = data.indexOf('-');
    props.push(data.substr(0, separatorIndex));
    props.push(data.substr(separatorIndex, data.length));

    return props;
  }
}
