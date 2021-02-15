import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as weatherActions from '../actions/weather-actions';
import { WeatherService } from '../../services/weather.service';
import { map, switchMap } from 'rxjs/operators';
import { Forecast } from 'src/app/models/forecast.model';

@Injectable({
  providedIn: 'root',
})
export class WeatherEffects {
  constructor(
    private actions$: Actions,
    private weatherService: WeatherService
  ) {}

  searchForecastByCity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(weatherActions.SEARCH_CITY_FORECAST),
      map((action: weatherActions.SearchCityForecast) => action.payload),
      switchMap((data) =>
        this.weatherService
          .getWeather(data)
          .pipe(
            map(
              (forecast: Forecast) =>
                new weatherActions.SearchCityForecastSuccess(forecast)
            )
          )
      )
    )
  );
}
